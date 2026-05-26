import { useBlockProps } from '@wordpress/block-editor';
import { RawHTML } from '@wordpress/element';

const getMathMLInnerHTML = ( mathML ) => {
	if ( ! mathML || typeof window === 'undefined' ) {
		return mathML || '';
	}

	const template = window.document.createElement( 'template' );
	template.innerHTML = mathML.trim();

	const mathElement = template.content.querySelector( 'math' );

	return mathElement ? mathElement.innerHTML : mathML;
};

export default function save( { attributes } ) {
	const { latex = '', mathML = '', textAlign = 'center' } = attributes;

	if ( ! latex.trim() && ! mathML.trim() ) {
		return null;
	}

	const blockProps = useBlockProps.save( {
		className: `equation-editor-equation has-text-align-${ textAlign }`,
	} );

	return (
		<figure { ...blockProps }>
			<math
				className="equation-editor__mathml"
				data-equation-editor-latex={ latex }
				display="block"
			>
				<RawHTML>{ getMathMLInnerHTML( mathML ) }</RawHTML>
			</math>
		</figure>
	);
}
