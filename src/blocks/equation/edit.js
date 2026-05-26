import {
	BlockControls,
	store as blockEditorStore,
	useBlockProps,
} from '@wordpress/block-editor';
import { Button, ToolbarButton, ToolbarGroup } from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { useCallback, useEffect, useRef, useState } from '@wordpress/element';
import { alignCenter, alignLeft, alignRight, math } from '@wordpress/icons';

import EquationPopover from '../../components/EquationPopover';

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

function EquationPreview( { latex } ) {
	return (
		<math-div
			aria-label="Equation preview"
			className="equation-editor-block__preview-math"
		>
			{ latex }
		</math-div>
	);
}

export default function Edit( { attributes, clientId, setAttributes } ) {
	const { latex = '', mathML = '', textAlign = 'center' } = attributes;
	const [ isPopoverOpen, setIsPopoverOpen ] = useState( false );
	const blockRef = useRef( null );
	const hasAutoOpenedRef = useRef( false );
	const hasEquation = Boolean( latex.trim() );

	const blockProps = useBlockProps( {
		className: `equation-editor-block has-text-align-${ textAlign }`,
		ref: blockRef,
	} );

	const wasJustInserted = useSelect(
		( select ) => {
			const editor = select( blockEditorStore );

			return (
				editor.wasBlockJustInserted( clientId ) ||
				editor.wasBlockJustInserted( clientId, 'inserter_menu' )
			);
		},
		[ clientId ]
	);

	useEffect( () => {
		if ( ! wasJustInserted || hasAutoOpenedRef.current ) {
			return;
		}

		hasAutoOpenedRef.current = true;
		setIsPopoverOpen( true );
	}, [ wasJustInserted ] );

	const updateAlignment = useCallback(
		( nextAlignment ) => {
			setAttributes( { textAlign: nextAlignment } );
		},
		[ setAttributes ]
	);

	const openPopover = useCallback( () => {
		setIsPopoverOpen( true );
	}, [] );

	const closePopover = useCallback( () => {
		setIsPopoverOpen( false );
	}, [] );

	const applyEquation = useCallback(
		( { latex: nextLatex, mathML: nextMathML } ) => {
			setAttributes( {
				latex: nextLatex,
				mathML: nextMathML || '',
			} );

			closePopover();
		},
		[ closePopover, setAttributes ]
	);

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
				<div className="equation-editor-block__preview">
					{ hasEquation ? (
						<EquationPreview key={ latex } latex={ latex } />
					) : (
						<p className="equation-editor-block__empty-message">
							Enter an equation to display it here.
						</p>
					) }

					<Button
						className="equation-editor-block__edit-button"
						icon={ math }
						onClick={ openPopover }
						variant="secondary"
					>
						{ hasEquation ? 'Edit equation' : 'Enter equation' }
					</Button>
				</div>

				{ isPopoverOpen && (
					<EquationPopover
						anchor={ blockRef.current }
						initialLatex={ latex }
						initialMathML={ mathML }
						isEditing={ hasEquation }
						onApply={ applyEquation }
						onClose={ closePopover }
					/>
				) }
			</div>
		</>
	);
}
