import { __ } from '@wordpress/i18n';

/**
 * Accessible tab list for switching between symbol groups.
 *
 * Each tab uses `aria-controls`/`aria-selected` to associate it with the panel
 * rendered by `SymbolPalette` (panel id `equation-editor-symbol-panel-<id>`).
 *
 * @param {Object}   props               Component props.
 * @param {string}   props.activeGroupId Id of the currently selected group.
 * @param {Object[]} props.groups        Symbol groups ({ id, label, rows }).
 * @param {Function} props.onSelectGroup Called with a group id when a tab is clicked.
 * @return {Element} The tab list.
 */
export default function SymbolTabs( { activeGroupId, groups, onSelectGroup } ) {
	return (
		<div
			aria-label={ __( 'Equation symbol groups', 'equation-editor' ) }
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
