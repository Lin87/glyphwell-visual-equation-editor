import {
	BlockControls,
	store as blockEditorStore,
	useBlockProps,
} from '@wordpress/block-editor';
import { Button, ToolbarButton, ToolbarGroup } from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import {
	RawHTML,
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { alignCenter, alignLeft, alignRight, math } from '@wordpress/icons';
import katex from 'katex';
import 'katex/dist/katex.min.css';

import EquationPopover from '../../components/EquationPopover';

/**
 * KaTeX render options for the editor preview. Kept in sync with the frontend
 * renderer (src/frontend/katex.js) so the preview matches the
 * published output exactly.
 */
const KATEX_OPTIONS = {
	throwOnError: false,
	output: 'htmlAndMathml',
	trust: false,
	maxSize: 20,
	maxExpand: 1000,
	displayMode: true,
};

const ALIGNMENTS = [
	{
		icon: alignLeft,
		label: __( 'Align left', 'equation-editor' ),
		value: 'left',
	},
	{
		icon: alignCenter,
		label: __( 'Align center', 'equation-editor' ),
		value: 'center',
	},
	{
		icon: alignRight,
		label: __( 'Align right', 'equation-editor' ),
		value: 'right',
	},
];

/**
 * Renders a muted placeholder line inside the block.
 *
 * @param {Object} props          Component props.
 * @param {string} props.children Message text to display.
 * @return {Element} The placeholder paragraph.
 */
function EmptyMessage( { children } ) {
	return <p className="equation-editor-block__empty-message">{ children }</p>;
}

/**
 * Renders a live preview of a LaTeX equation inside the editor.
 *
 * @param {Object} props       Component props.
 * @param {string} props.latex LaTeX source to render.
 * @return {Element} The rendered math, or a placeholder if rendering fails.
 */
function EquationPreview( { latex } ) {
	const markup = useMemo( () => {
		try {
			return katex.renderToString( latex, KATEX_OPTIONS );
		} catch {
			return '';
		}
	}, [ latex ] );

	if ( ! markup ) {
		return (
			<EmptyMessage>
				{ __(
					'The equation preview could not be rendered.',
					'equation-editor'
				) }
			</EmptyMessage>
		);
	}

	return (
		<RawHTML className="equation-editor-block__preview-math">
			{ markup }
		</RawHTML>
	);
}

/**
 * Edit interface for the equation block.
 *
 * Shows a preview plus an edit button, exposes alignment controls in the block
 * toolbar, and opens the equation popover automatically when the block is first
 * inserted so the user can start typing immediately.
 *
 * @param {Object}   props               Block edit props.
 * @param {Object}   props.attributes    Block attributes (latex, mathML, textAlign).
 * @param {string}   props.clientId      Client id of this block instance.
 * @param {Function} props.setAttributes Updates block attributes.
 * @return {Element} The block edit UI.
 */
export default function Edit( { attributes, clientId, setAttributes } ) {
	const { latex = '', mathML = '', textAlign = 'center' } = attributes;
	const [ isPopoverOpen, setIsPopoverOpen ] = useState( false );
	const blockRef = useRef( null );
	const hasAutoOpenedRef = useRef( false );
	const hasEquation = Boolean( latex.trim() );

	const blockProps = useBlockProps( {
		className: 'equation-editor-block',
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

	// Auto-open the popover once, the first time this block is inserted. The
	// ref guard prevents re-opening if `wasJustInserted` stays true across
	// re-renders or after the user has manually closed the popover.
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
				<ToolbarGroup
					label={ __( 'Equation alignment', 'equation-editor' ) }
				>
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
				<div className="equation-editor-block__preview-wrapper">
					<div
						className={ `equation-editor-block__preview has-text-align-${ textAlign }` }
					>
						{ hasEquation ? (
							<EquationPreview key={ latex } latex={ latex } />
						) : (
							<EmptyMessage>
								{ __(
									'Enter an equation to display it here.',
									'equation-editor'
								) }
							</EmptyMessage>
						) }
					</div>
					<div class="equation-editor-block__preview-actions">
						<Button
							className="equation-editor-block__edit-button"
							icon={ math }
							onClick={ openPopover }
							variant="secondary"
							disabled={ isPopoverOpen }
						>
							{ hasEquation
								? __( 'Edit equation', 'equation-editor' )
								: __( 'Enter equation', 'equation-editor' ) }
						</Button>
					</div>
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
