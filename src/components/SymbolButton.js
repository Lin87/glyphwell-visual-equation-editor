import { useMemo } from '@wordpress/element';
import katex from 'katex';
import 'katex/dist/katex.min.css';

/**
 * KaTeX render options for the palette glyphs. Mirrors the editor preview and
 * frontend renderers (src/blocks/equation/edit.js, src/frontend/katex.js) so a
 * button previews exactly what gets inserted, but renders inline (not display).
 */
const KATEX_OPTIONS = {
	throwOnError: false,
	output: 'htmlAndMathml',
	trust: false,
	maxSize: 20,
	maxExpand: 1000,
	displayMode: false,
};

/**
 * Rewrites MathLive placeholder tokens (`#0`, `#1`, …) into KaTeX-renderable
 * empty boxes, since `#` is a macro-parameter char KaTeX cannot render. This is
 * display-only; the unmodified `latex` is still what gets inserted on click.
 *
 * @param {string} latex LaTeX carrying MathLive placeholders.
 * @return {string} LaTeX with each placeholder replaced by `\square`.
 */
const toRenderableLatex = ( latex ) => latex.replace( /#\d+/g, '\\square' );

/**
 * Cache of rendered markup keyed by LaTeX, shared across every button instance.
 *
 * Switching palette tabs or reopening the popover unmounts and remounts the
 * buttons, so a per-component memo would re-run KaTeX for the same glyphs every
 * time. Caching at module scope means each unique LaTeX string is rendered once
 * per page load; later views are instant map lookups.
 *
 * @type {Map<string, string>}
 */
const markupCache = new Map();

/**
 * Renders a symbol's LaTeX to KaTeX markup, reusing the shared cache.
 *
 * @param {string} latex The symbol's LaTeX (with MathLive placeholders).
 * @return {string} The KaTeX HTML/MathML markup, or an empty string on failure.
 */
const renderSymbolMarkup = ( latex ) => {
	if ( markupCache.has( latex ) ) {
		return markupCache.get( latex );
	}

	let markup = '';

	try {
		markup = katex.renderToString(
			toRenderableLatex( latex ),
			KATEX_OPTIONS
		);
	} catch {
		markup = '';
	}

	markupCache.set( latex, markup );

	return markup;
};

/**
 * KaTeX web-font families the palette glyphs draw from.
 *
 * @type {string[]}
 */
const KATEX_FONT_FAMILIES = [
	'KaTeX_AMS',
	'KaTeX_Caligraphic',
	'KaTeX_Fraktur',
	'KaTeX_Main',
	'KaTeX_Math',
	'KaTeX_SansSerif',
	'KaTeX_Script',
	'KaTeX_Size1',
	'KaTeX_Size2',
	'KaTeX_Size3',
	'KaTeX_Size4',
	'KaTeX_Typewriter',
];

let fontsWarmed = false;

/**
 * Asks the browser to download the KaTeX web fonts ahead of first use.
 *
 * KaTeX fonts load lazily the first time a glyph needs them, so the initial
 * palette render briefly shows fallback glyphs before snapping into the real
 * shapes (a flash of unstyled text). Requesting the fonts via the Font Loading
 * API when the editor bundle loads means they are already cached by the time
 * the popover opens. Runs at most once and no-ops where the API is absent.
 *
 * @return {void}
 */
const warmKatexFonts = () => {
	if (
		fontsWarmed ||
		typeof document === 'undefined' ||
		! document.fonts?.load
	) {
		return;
	}

	fontsWarmed = true;

	KATEX_FONT_FAMILIES.forEach( ( family ) => {
		// Cover the upright, italic, and bold faces KaTeX ships; the Font
		// Loading API simply resolves empty for combinations a family lacks.
		[ '', 'italic ', 'bold ', 'italic bold ' ].forEach( ( variant ) => {
			try {
				document.fonts.load( `${ variant }10px "${ family }"` );
			} catch {
				// Ignore: an unparseable descriptor just skips that face.
			}
		} );
	} );
};

warmKatexFonts();

/**
 * Renders a single clickable symbol in the palette.
 *
 * The glyph is rendered from the symbol's authoritative `latex` via KaTeX,
 * falling back to the plain `visual` string if KaTeX cannot render it.
 *
 * @param {Object}   props          Component props.
 * @param {Function} props.onInsert Called with the symbol when the button is clicked.
 * @param {Object}   props.symbol   Symbol descriptor ({ id, visual, latex, ariaLabel }).
 * @return {Element} The symbol button.
 */
export default function SymbolButton( { onInsert, symbol } ) {
	const markup = useMemo(
		() => renderSymbolMarkup( symbol.latex ),
		[ symbol.latex ]
	);

	return (
		<button
			type="button"
			aria-label={ symbol.ariaLabel }
			className="equation-editor-symbol-button"
			onClick={ () => onInsert( symbol ) }
		>
			{ markup ? (
				<span dangerouslySetInnerHTML={ { __html: markup } } />
			) : (
				symbol.visual
			) }
		</button>
	);
}
