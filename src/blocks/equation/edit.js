import { BlockControls, useBlockProps } from '@wordpress/block-editor';
import { Button, ToolbarButton, ToolbarGroup } from '@wordpress/components';
import { useCallback, useRef } from '@wordpress/element';
import { alignCenter, alignLeft, alignRight } from '@wordpress/icons';

import MathFieldControl from '../../components/MathFieldControl';

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

const TEMP_SYMBOLS = [
	{
		ariaLabel: 'Insert fraction',
		latex: '\\frac{#0}{#1}',
		visual: 'n/m',
	},
	{
		ariaLabel: 'Insert square root',
		latex: '\\sqrt{#0}',
		visual: '√',
	},
	{
		ariaLabel: 'Insert pi',
		latex: '\\pi',
		visual: 'π',
	},
	{
		ariaLabel: 'Insert plus minus',
		latex: '\\pm',
		visual: '±',
	},
	{
		ariaLabel: 'Insert sum',
		latex: '\\sum',
		visual: '∑',
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

	const insertSymbol = useCallback( ( nextLatex ) => {
		mathfieldRef.current?.insertLatex( nextLatex );
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

				<div
					aria-label="Temporary equation symbols"
					className="equation-editor-block__temporary-symbols"
				>
					{ TEMP_SYMBOLS.map( ( symbol ) => (
						<Button
							key={ symbol.latex }
							aria-label={ symbol.ariaLabel }
							className="equation-editor-block__temporary-symbol"
							onClick={ () => insertSymbol( symbol.latex ) }
							variant="secondary"
						>
							{ symbol.visual }
						</Button>
					) ) }
				</div>
			</div>
		</>
	);
}
