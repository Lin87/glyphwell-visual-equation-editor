import { Button, Popover, TextareaControl } from '@wordpress/components';
import { useCallback, useEffect, useRef, useState } from '@wordpress/element';

import MathFieldControl from './MathFieldControl';
import SymbolPalette from './SymbolPalette';

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
			className="equation-editor-inline-popover"
			focusOnMount={ false }
			onClose={ onClose }
			placement="bottom-start"
		>
			<div className="equation-editor-inline-popover__content">
				<div className="equation-editor-inline-popover__field">
					<MathFieldControl
						ref={ mathfieldRef }
						latex={ latex }
						onLatexChange={ setLatex }
						onMathMLChange={ setMathML }
					/>
				</div>

				<SymbolPalette onInsertSymbol={ insertSymbol } />

				<TextareaControl
					className="equation-editor-inline-popover__latex"
					label="LaTeX"
					value={ latex }
					onChange={ setLatex }
					__nextHasNoMarginBottom
				/>

				<div className="equation-editor-inline-popover__actions">
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
