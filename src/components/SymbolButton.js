/**
 * Renders a single clickable symbol in the palette.
 *
 * @param {Object}   props          Component props.
 * @param {Function} props.onInsert Called with the symbol when the button is clicked.
 * @param {Object}   props.symbol   Symbol descriptor ({ id, visual, latex, ariaLabel }).
 * @return {Element} The symbol button.
 */
export default function SymbolButton( { onInsert, symbol } ) {
	return (
		<button
			type="button"
			aria-label={ symbol.ariaLabel }
			className="equation-editor-symbol-button"
			onClick={ () => onInsert( symbol ) }
		>
			{ symbol.visual }
		</button>
	);
}
