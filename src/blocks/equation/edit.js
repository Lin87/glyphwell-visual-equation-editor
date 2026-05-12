import { useBlockProps } from '@wordpress/block-editor';
import { createElement } from '@wordpress/element';

export default function Edit( { attributes } ) {
	const textAlign = attributes.textAlign || 'center';
	const blockProps = useBlockProps( {
		className: `has-text-align-${ textAlign }`,
	} );

	return createElement(
		'div',
		blockProps,
		createElement(
			'div',
			{ className: 'equation-editor-placeholder' },
			createElement( 'strong', null, 'Equation Editor' ),
			createElement(
				'p',
				null,
				'Placeholder block scaffold. Math editing arrives in Milestone 3.'
			)
		)
	);
}
