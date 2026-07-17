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
