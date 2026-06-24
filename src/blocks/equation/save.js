import { useBlockProps } from '@wordpress/block-editor';
import { RawHTML } from '@wordpress/element';

import { MATHML_CLASS } from '../../constants';
import { getMathMLInnerHTML } from '../../utils/mathml';

/**
 * Serializes the equation block for the front end.
 *
 * Outputs a `<figure>` wrapping a block-level `<math>` element that carries the
 * original LaTeX (consumed by the KaTeX renderer) and the rendered MathML inner
 * markup. Returns `null` for an empty equation so no markup is persisted.
 *
 * @param {Object} props            Block save props.
 * @param {Object} props.attributes Saved block attributes (latex, mathML, textAlign).
 * @return {?Element} The block markup, or `null` when the equation is empty.
 */
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
				className={ MATHML_CLASS }
				data-equation-editor-latex={ latex }
				display="block"
			>
				<RawHTML>{ getMathMLInnerHTML( mathML ) }</RawHTML>
			</math>
		</figure>
	);
}
