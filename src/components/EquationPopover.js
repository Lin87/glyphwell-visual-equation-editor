import {
	Button,
	Popover,
	TextareaControl,
	ToggleControl,
} from '@wordpress/components';
import { useCallback, useEffect, useRef, useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

import MathFieldControl from './MathFieldControl';
import SymbolPalette from './SymbolPalette';

/**
 * Popover for composing an equation.
 *
 * Hosts the math field, symbol palette, and a raw LaTeX textarea, and exposes
 * Apply/Update, Remove (when editing), and Cancel actions back to the caller.
 *
 * @param {Object}      props               Component props.
 * @param {HTMLElement} props.anchor        Element the popover is positioned against.
 * @param {string}      props.initialLatex  LaTeX to seed the field with.
 * @param {string}      props.initialMathML MathML to seed the field with.
 * @param {boolean}     props.isEditing     True when editing an existing equation.
 * @param {Function}    props.onApply       Called with { latex, mathML } to apply.
 * @param {Function}    props.onClose       Called to dismiss without changes.
 * @param {Function}    [props.onRemove]    Called to remove the existing equation.
 * @return {Element} The popover UI.
 */
export default function EquationPopover( {
	anchor,
	initialLatex = '',
	initialMathML = '',
	isEditing = false,
	onApply,
	onClose,
	onRemove,
} ) {
	const [ latex, setLatex ] = useState( initialLatex );
	const [ mathML, setMathML ] = useState( initialMathML );
	const [ showLatex, setShowLatex ] = useState( false );
	const mathfieldRef = useRef( null );

	useEffect( () => {
		mathfieldRef.current?.focus();
	}, [] );

	const insertSymbol = useCallback( ( symbol ) => {
		mathfieldRef.current?.insertLatex( symbol.latex );
	}, [] );

	const insertLatex = useCallback( ( latex ) => {
		mathfieldRef.current?.insertLatex( latex );
	}, [] );

	const runCommand = useCallback( ( command ) => {
		mathfieldRef.current?.runCommand( command );
	}, [] );

	// Applies the equation; an empty field means "no equation", so when editing
	// we remove the existing one, and when inserting we simply close.
	const applyEquation = useCallback( () => {
		if ( ! latex.trim() ) {
			if ( isEditing && typeof onRemove === 'function' ) {
				onRemove();
				return;
			}

			onClose();
			return;
		}

		onApply( {
			latex,
			mathML,
		} );
	}, [ isEditing, latex, mathML, onApply, onClose, onRemove ] );

	return (
		<Popover
			anchor={ anchor }
			className="equation-editor-popover"
			focusOnMount={ true }
			onClose={ onClose }
			onFocusOutside={ () => void {} }
			resize={ false }
			shift={ true }
		>
			<div className="equation-editor-popover__content">
				<div className="equation-editor-popover__field">
					<MathFieldControl
						ref={ mathfieldRef }
						latex={ latex }
						onLatexChange={ setLatex }
						onMathMLChange={ setMathML }
					/>
				</div>

				<SymbolPalette
					onInsertSymbol={ insertSymbol }
					onInsertLatex={ insertLatex }
					onRunCommand={ runCommand }
				/>

				<ToggleControl
					className="equation-editor-popover__latex-toggle"
					label={ __( 'Show LaTeX', 'equation-editor' ) }
					checked={ showLatex }
					onChange={ setShowLatex }
					__nextHasNoMarginBottom
				/>

				<TextareaControl
					className={ `equation-editor-popover__latex${
						showLatex
							? ''
							: ' equation-editor-popover__latex--hidden'
					}` }
					label={ __( 'LaTeX', 'equation-editor' ) }
					value={ latex }
					onChange={ setLatex }
					readOnly={ ! showLatex }
					__nextHasNoMarginBottom
				/>

				<div className="equation-editor-popover__actions">
					<Button variant="primary" onClick={ applyEquation }>
						{ isEditing
							? __( 'Update', 'equation-editor' )
							: __( 'Apply', 'equation-editor' ) }
					</Button>

					{ isEditing && (
						<Button
							isDestructive
							variant="secondary"
							onClick={ onRemove }
						>
							{ __( 'Remove', 'equation-editor' ) }
						</Button>
					) }

					<Button variant="tertiary" onClick={ onClose }>
						{ __( 'Cancel', 'equation-editor' ) }
					</Button>
				</div>
			</div>
		</Popover>
	);
}
