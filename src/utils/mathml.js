import katex from 'katex';

import { KATEX_OPTIONS } from './katex-options';

/**
 * Generates MathML for a LaTeX equation with KaTeX, using the same options as
 * the rendered equation so the stored MathML matches it as closely as possible.
 *
 * @param {string}  latex       LaTeX source of the equation.
 * @param {boolean} displayMode True for a display (block) equation, false for inline.
 * @return {string} A serialized `<math>` element, or an empty string when the
 *                  LaTeX cannot be rendered.
 */
export const latexToMathML = ( latex, displayMode ) => {
	if ( ! latex || typeof window === 'undefined' ) {
		return '';
	}

	let markup;

	try {
		markup = katex.renderToString( latex, {
			...KATEX_OPTIONS,
			displayMode,
			output: 'mathml',
		} );
	} catch {
		return '';
	}

	const template = window.document.createElement( 'template' );
	template.innerHTML = markup;

	return template.content.querySelector( 'math' )?.outerHTML || '';
};

/**
 * Extracts the inner markup of a `<math>` element from a MathML string.
 *
 * Equation MathML is stored as a complete `<math>…</math>` document, but both
 * the block save output and the inline format need only the element's *inner*
 * HTML so it can be re-wrapped in their own `<math>` host. Parsing through a
 * detached `<template>` keeps the markup inert (it is never rendered or run).
 *
 * @param {string} mathML Serialized `<math>` markup.
 * @return {string} The inner HTML of the `<math>` element, or the original
 *                  input when it cannot be parsed (e.g. outside the browser).
 */
export const getMathMLInnerHTML = ( mathML ) => {
	if ( ! mathML || typeof window === 'undefined' ) {
		return mathML || '';
	}

	const template = window.document.createElement( 'template' );
	template.innerHTML = mathML.trim();

	const mathElement = template.content.querySelector( 'math' );

	return mathElement ? mathElement.innerHTML : mathML;
};
