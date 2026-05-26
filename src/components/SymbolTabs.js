export default function SymbolTabs( { activeGroupId, groups, onSelectGroup } ) {
	return (
		<div
			aria-label="Equation symbol groups"
			className="equation-editor-symbol-tabs"
			role="tablist"
		>
			{ groups.map( ( group ) => (
				<button
					key={ group.id }
					type="button"
					aria-controls={ `equation-editor-symbol-panel-${ group.id }` }
					aria-selected={ activeGroupId === group.id }
					className="equation-editor-symbol-tab"
					id={ `equation-editor-symbol-tab-${ group.id }` }
					onClick={ () => onSelectGroup( group.id ) }
					role="tab"
				>
					{ group.label }
				</button>
			) ) }
		</div>
	);
}
