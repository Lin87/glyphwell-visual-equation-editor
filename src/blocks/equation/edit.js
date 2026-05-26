import { BlockControls, useBlockProps } from '@wordpress/block-editor';
import { ToolbarButton, ToolbarGroup } from '@wordpress/components';
import { useCallback, useRef } from '@wordpress/element';
import { alignCenter, alignLeft, alignRight } from '@wordpress/icons';

import MathFieldControl from '../../components/MathFieldControl';
import SymbolPalette from '../../components/SymbolPalette';

const ALIGNMENTS = [
	{
		icon: alignLeft,
		label: 'Align left',
		value: 'left',
	},
	{
		icon: alignCenter,
		label: 'Align center',
		value: 'center',
	},
	{
		icon: alignRight,
		label: 'Align right',
		value: 'right',
	},
];

export default function Edit( { attributes, setAttributes } ) {
	const { latex = '', textAlign = 'center' } = attributes;
	const mathfieldRef = useRef( null );

	const blockProps = useBlockProps( {
		className: `equation-editor-block has-text-align-${ textAlign }`,
	} );

	const updateLatex = useCallback(
		( nextLatex ) => {
			setAttributes( { latex: nextLatex } );
		},
		[ setAttributes ]
	);

	const updateMathML = useCallback(
		( nextMathML ) => {
			setAttributes( { mathML: nextMathML || '' } );
		},
		[ setAttributes ]
	);

	const updateAlignment = useCallback(
		( nextAlignment ) => {
			setAttributes( { textAlign: nextAlignment } );
		},
		[ setAttributes ]
	);

	const insertSymbol = useCallback( ( symbol ) => {
		mathfieldRef.current?.insertLatex( symbol.latex );
	}, [] );

	return (
		<>
			<BlockControls>
				<ToolbarGroup label="Equation alignment">
					{ ALIGNMENTS.map( ( alignment ) => (
						<ToolbarButton
							key={ alignment.value }
							icon={ alignment.icon }
							isPressed={ textAlign === alignment.value }
							label={ alignment.label }
							onClick={ () => updateAlignment( alignment.value ) }
						/>
					) ) }
				</ToolbarGroup>
			</BlockControls>

			<div { ...blockProps }>
				<div className="equation-editor-block__field">
					<MathFieldControl
						ref={ mathfieldRef }
						latex={ latex }
						onLatexChange={ updateLatex }
						onMathMLChange={ updateMathML }
					/>
				</div>

				<SymbolPalette onInsertSymbol={ insertSymbol } />
			</div>
		</>
	);
}
