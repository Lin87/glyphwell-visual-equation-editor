import './frontend.scss';
import 'katex/dist/katex.min.css';

import katex from 'katex';

const KATEX_OPTIONS = {
	throwOnError: false,
	output: 'htmlAndMathml',
	trust: false,
	maxSize: 20,
	maxExpand: 1000,
};

const renderEquation = ( element, displayMode ) => {
	const latex =
		element.dataset.latex || element.dataset.equationEditorLatex || '';

	if ( ! latex ) {
		return;
	}

	const renderTarget =
		element.namespaceURI === 'http://www.w3.org/1998/Math/MathML'
			? document.createElement( displayMode ? 'div' : 'span' )
			: element;

	if ( renderTarget !== element ) {
		renderTarget.className = element.getAttribute( 'class' ) || '';
		renderTarget.dataset.equationEditorLatex = latex;
	}

	katex.render( latex, renderTarget, {
		...KATEX_OPTIONS,
		displayMode,
	} );

	if ( renderTarget !== element ) {
		element.replaceWith( renderTarget );
	}
};

document
	.querySelectorAll( '.equation-editor__fallback' )
	.forEach( ( element ) => {
		renderEquation( element, element.dataset.displayMode === 'block' );
	} );

document
	.querySelectorAll( '.equation-editor__mathml[data-equation-editor-latex]' )
	.forEach( ( element ) => {
		renderEquation(
			element,
			element.getAttribute( 'display' ) === 'block'
		);
	} );

document
	.querySelectorAll( '.equation-editor-inline[data-equation-editor-latex]' )
	.forEach( ( element ) => {
		renderEquation( element, false );
	} );
