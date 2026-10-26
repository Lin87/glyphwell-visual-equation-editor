import 'katex/dist/katex.min.css';
import katex from 'katex';

import {
	FALLBACK_CLASS,
	INLINE_CLASS,
	LATEX_DATA_ATTRIBUTE,
	MATHML_CLASS,
} from '../constants';

/**
 * KaTeX render options shared by every render target.
 *
 * `htmlAndMathml` keeps an accessible MathML tree alongside the visual HTML,
 * while `trust: false` plus the size/expansion caps guard against malicious or
 * runaway input rendered from saved post content.
 */
const KATEX_OPTIONS = {
	throwOnError: false,
	output: 'htmlAndMathml',
	trust: false,
	maxSize: 20,
	maxExpand: 1000,
};

/**
 * Renders the LaTeX carried by an element into the DOM using KaTeX.
 *
 * @param {HTMLElement} element     Element carrying the LaTeX in a data attribute.
 * @param {boolean}     displayMode True to render block (display) math, false for inline.
 * @return {void}
 */
const renderEquationWithKatex = ( element, displayMode ) => {
	const latex = element.dataset.glyphwellLatex || '';

	if ( ! latex ) {
		return;
	}

	// KaTeX cannot render into a <math> node, so when the target is itself a
	// MathML element we render into a fresh div/span and swap it in below.
	const renderTarget =
		element.namespaceURI === 'http://www.w3.org/1998/Math/MathML'
			? document.createElement( displayMode ? 'div' : 'span' )
			: element;

	if ( renderTarget !== element ) {
		renderTarget.className = element.getAttribute( 'class' ) || '';
		renderTarget.dataset.glyphwellLatex = latex;
	}

	katex.render( latex, renderTarget, {
		...KATEX_OPTIONS,
		displayMode,
	} );

	if ( renderTarget !== element ) {
		element.replaceWith( renderTarget );
	}
};

/**
 * Markers to scan for, and how each derives its display mode. Block and inline
 * equations encode the mode differently, so each selector needs its own rule.
 */
const RENDER_TARGETS = [
	{
		selector: `.${ FALLBACK_CLASS }`,
		getDisplayMode: ( element ) => element.dataset.displayMode === 'block',
	},
	{
		selector: `.${ MATHML_CLASS }[${ LATEX_DATA_ATTRIBUTE }]`,
		getDisplayMode: ( element ) =>
			element.getAttribute( 'display' ) === 'block',
	},
	{
		selector: `.${ INLINE_CLASS }[${ LATEX_DATA_ATTRIBUTE }]`,
		getDisplayMode: () => false,
	},
];

RENDER_TARGETS.forEach( ( { selector, getDisplayMode } ) => {
	document.querySelectorAll( selector ).forEach( ( element ) => {
		renderEquationWithKatex( element, getDisplayMode( element ) );
	} );
} );
