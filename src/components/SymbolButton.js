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
