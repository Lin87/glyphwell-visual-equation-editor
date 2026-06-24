import { Button, Popover, TextareaControl } from '@wordpress/components';
import { useCallback, useEffect, useRef, useState } from '@wordpress/element';

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
	const mathfieldRef = useRef( null );

	useEffect( () => {
		mathfieldRef.current?.focus();
	}, [] );

	const insertSymbol = useCallback( ( symbol ) => {
		mathfieldRef.current?.insertLatex( symbol.latex );
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
			focusOnMount={ false }
			onClose={ onClose }
			onFocusOutside = {(() => void{})}
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

				<SymbolPalette onInsertSymbol={ insertSymbol } />

				<TextareaControl
					className="equation-editor-popover__latex"
					label="LaTeX"
					value={ latex }
					onChange={ setLatex }
					__nextHasNoMarginBottom
				/>

				<div className="equation-editor-popover__actions">
					<Button variant="primary" onClick={ applyEquation }>
						{ isEditing ? 'Update' : 'Apply' }
					</Button>

					{ isEditing && (
						<Button
							isDestructive
							variant="secondary"
							onClick={ onRemove }
						>
							Remove
						</Button>
					) }

					<Button variant="tertiary" onClick={ onClose }>
						Cancel
					</Button>
				</div>
			</div>
		</Popover>
	);
}
