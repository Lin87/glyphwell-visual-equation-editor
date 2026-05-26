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

	katex.render( latex, element, {
		...KATEX_OPTIONS,
		displayMode,
	} );
};

document
	.querySelectorAll( '.equation-editor__fallback' )
	.forEach( ( element ) => {
		renderEquation( element, element.dataset.displayMode === 'block' );
	} );

document
	.querySelectorAll( '.equation-editor-inline[data-equation-editor-latex]' )
	.forEach( ( element ) => {
		renderEquation( element, false );
	} );
