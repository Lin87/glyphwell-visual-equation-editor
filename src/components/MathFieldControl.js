import {
	forwardRef,
	useCallback,
	useEffect,
	useImperativeHandle,
	useRef,
} from '@wordpress/element';
import { MathfieldElement } from 'mathlive';

const MATH_FIELD_TAG = 'math-field';

/**
 * Registers MathLive's `<math-field>` custom element, once, if not already done.
 *
 * @return {void}
 */
const defineMathfieldElement = () => {
	if (
		typeof window === 'undefined' ||
		! window.customElements ||
		window.customElements.get( MATH_FIELD_TAG )
	) {
		return;
	}

	try {
		window.customElements.define( MATH_FIELD_TAG, MathfieldElement );
	} catch {
		// MathLive may already be registered by another editor entry point.
	}
};

/**
 * Creates a `<math-field>` element in the correct document context.
 *
 * The editor canvas may live in an iframe, so the element must be created from
 * the document where the custom element is actually defined. We prefer the
 * field's own document, fall back to the top window, and finally create it in
 * the owner document regardless so a node is always returned.
 *
 * @param {Document} ownerDocument Document the field will be inserted into.
 * @return {HTMLElement} A new `<math-field>` element.
 */
const createMathfieldElement = ( ownerDocument ) => {
	defineMathfieldElement();

	const ownerWindow = ownerDocument.defaultView;

	if ( ownerWindow?.customElements?.get( MATH_FIELD_TAG ) ) {
		return ownerDocument.createElement( MATH_FIELD_TAG );
	}

	if (
		typeof document !== 'undefined' &&
		window?.customElements?.get( MATH_FIELD_TAG )
	) {
		return document.createElement( MATH_FIELD_TAG );
	}

	return ownerDocument.createElement( MATH_FIELD_TAG );
};

/**
 * Safely reads the MathML representation of the field's current value.
 *
 * @param {HTMLElement} mathfield The `<math-field>` element.
 * @return {string} The MathML markup, or an empty string on failure.
 */
const getMathML = ( mathfield ) => {
	try {
		return mathfield.getValue?.( 'math-ml' ) || '';
	} catch {
		return '';
	}
};

/**
 * Serializes all rules of a stylesheet into a single CSS string.
 *
 * @param {CSSStyleSheet} styleSheet The stylesheet to serialize.
 * @return {string} The combined CSS text, or an empty string on failure.
 */
const getStyleSheetText = ( styleSheet ) => {
	try {
		return Array.from( styleSheet.cssRules )
			.map( ( rule ) => rule.cssText )
			.join( '\n' );
	} catch {
		return '';
	}
};

/**
 * Collects the CSS text of every adopted stylesheet in the field's shadow DOM.
 *
 * @param {HTMLElement} mathfield The `<math-field>` element.
 * @return {string[]} CSS text for each adopted stylesheet (empty entries dropped).
 */
const getShadowStyleTexts = ( mathfield ) => {
	const shadowRoot = mathfield.shadowRoot;

	if ( ! shadowRoot || ! shadowRoot.adoptedStyleSheets ) {
		return [];
	}

	return Array.from( shadowRoot.adoptedStyleSheets )
		.map( getStyleSheetText )
		.filter( Boolean );
};

/**
 * Re-applies captured shadow-DOM styles in the field's owner document.
 *
 * Adopted (constructed) stylesheets are bound to the document that created them,
 * so when the field is moved into another document (e.g. the editor iframe) its
 * styles are lost. We rebuild them as constructed stylesheets owned by the new
 * document, falling back to plain `<style>` tags where that API is unavailable.
 *
 * @param {HTMLElement} mathfield     The `<math-field>` element.
 * @param {Document}    ownerDocument Document the field now belongs to.
 * @param {string[]}    styleTexts    CSS text captured from the original shadow DOM.
 * @return {void}
 */
const restoreShadowStylesForDocument = (
	mathfield,
	ownerDocument,
	styleTexts
) => {
	const shadowRoot = mathfield.shadowRoot;

	if ( ! shadowRoot || ! styleTexts.length ) {
		return;
	}

	const ownerWindow = ownerDocument.defaultView;

	if ( ownerWindow?.CSSStyleSheet && 'adoptedStyleSheets' in shadowRoot ) {
		try {
			shadowRoot.adoptedStyleSheets = styleTexts.map( ( cssText ) => {
				const styleSheet = new ownerWindow.CSSStyleSheet();
				styleSheet.replaceSync( cssText );

				return styleSheet;
			} );

			return;
		} catch {
			// Fall back to style tags below.
		}
	}

	styleTexts.forEach( ( cssText ) => {
		const style = ownerDocument.createElement( 'style' );
		style.textContent = cssText;
		shadowRoot.prepend( style );
	} );
};

/**
 * Forces the field to render with the light theme regardless of editor theme.
 *
 * @param {HTMLElement} mathfield The `<math-field>` element.
 * @return {void}
 */
const forceLightTheme = ( mathfield ) => {
	mathfield.setAttribute( 'theme', 'light' );
};

/**
 * React wrapper around MathLive's imperative `<math-field>` custom element.
 *
 * Mounts the element into a container, bridges its `input` events to the change
 * callbacks, syncs external `latex` changes into the field, and exposes a
 * `focus()` / `insertLatex()` imperative handle via the forwarded ref.
 *
 * @param {Object}   props                Component props.
 * @param {string}   [props.className]    Extra class added to the field element.
 * @param {string}   [props.latex]        Controlled LaTeX value.
 * @param {Function} props.onLatexChange  Called with the LaTeX on every edit.
 * @param {Function} props.onMathMLChange Called with the MathML on every edit.
 * @param {Object}   ref                  Forwarded ref exposing the imperative handle.
 * @return {Element} The container element hosting the math field.
 */
function MathFieldControl(
	{ className = '', latex = '', onLatexChange, onMathMLChange },
	ref
) {
	// Latest callbacks, read through a ref so the mount effect need not depend
	// on them (and thus re-create the field) when the parent re-renders.
	const callbacksRef = useRef( { onLatexChange, onMathMLChange } );
	const containerRef = useRef( null );
	const initialLatexRef = useRef( latex || '' );
	// Last value we pushed to / read from the field, used to skip redundant
	// syncs when the controlled `latex` prop merely echoes our own edits.
	const lastLatexRef = useRef( latex || '' );
	const mathfieldRef = useRef( null );

	useEffect( () => {
		callbacksRef.current = { onLatexChange, onMathMLChange };
	}, [ onLatexChange, onMathMLChange ] );

	// Reads the field's current value and forwards it to the change callbacks.
	const emitCurrentValue = useCallback( ( mathfield ) => {
		const nextLatex = mathfield.value || '';
		const callbacks = callbacksRef.current;

		lastLatexRef.current = nextLatex;

		if ( typeof callbacks.onLatexChange === 'function' ) {
			callbacks.onLatexChange( nextLatex );
		}

		if ( typeof callbacks.onMathMLChange === 'function' ) {
			callbacks.onMathMLChange( getMathML( mathfield ) );
		}
	}, [] );

	useEffect( () => {
		const container = containerRef.current;

		if ( ! container ) {
			return undefined;
		}

		const ownerDocument = container.ownerDocument;
		const mathfield = createMathfieldElement( ownerDocument );

		const shadowStyleTexts = getShadowStyleTexts( mathfield );

		mathfield.setAttribute( 'aria-label', 'Equation editor' );
		mathfield.className = [ 'equation-editor-math-field', className ]
			.filter( Boolean )
			.join( ' ' );

		mathfield.mathVirtualKeyboardPolicy = 'manual';
		mathfield.smartFence = true;
		mathfield.value = initialLatexRef.current;

		mathfieldRef.current = mathfield;
		lastLatexRef.current = initialLatexRef.current;

		container.appendChild( mathfield );

		restoreShadowStylesForDocument(
			mathfield,
			ownerDocument,
			shadowStyleTexts
		);
		forceLightTheme( mathfield );

		if ( typeof callbacksRef.current.onMathMLChange === 'function' ) {
			callbacksRef.current.onMathMLChange( getMathML( mathfield ) );
		}

		const handleInput = () => {
			emitCurrentValue( mathfield );
		};

		mathfield.addEventListener( 'input', handleInput );

		return () => {
			mathfield.removeEventListener( 'input', handleInput );

			// Blur before removal so MathLive clears its global "focused
			// field" pointer while this field's model is still valid.
			try {
				mathfield.blur?.();
			} catch {
				// Ignore: blurring is best-effort cleanup.
			}

			mathfield.remove();

			if ( mathfieldRef.current === mathfield ) {
				mathfieldRef.current = null;
			}
		};
	}, [ className, emitCurrentValue ] );

	// Sync externally-driven `latex` changes into the field, skipping values
	// that originated from the field itself (tracked by lastLatexRef).
	useEffect( () => {
		const mathfield = mathfieldRef.current;
		const nextLatex = latex || '';

		if ( ! mathfield || nextLatex === lastLatexRef.current ) {
			return;
		}

		mathfield.value = nextLatex;
		lastLatexRef.current = nextLatex;

		if ( typeof callbacksRef.current.onMathMLChange === 'function' ) {
			callbacksRef.current.onMathMLChange( getMathML( mathfield ) );
		}
	}, [ latex ] );

	useImperativeHandle(
		ref,
		() => ( {
			focus() {
				mathfieldRef.current?.focus();
			},
			insertLatex( nextLatex ) {
				const mathfield = mathfieldRef.current;

				if ( ! mathfield ) {
					return;
				}

				mathfield.focus();

				mathfield.insert( nextLatex, {
					insertionMode: 'replaceSelection',
					selectionMode: 'placeholder',
				} );

				emitCurrentValue( mathfield );
				mathfield.focus();
			},
		} ),
		[ emitCurrentValue ]
	);

	return (
		<div
			ref={ containerRef }
			className="equation-editor-math-field-container"
		/>
	);
}

export default forwardRef( MathFieldControl );
