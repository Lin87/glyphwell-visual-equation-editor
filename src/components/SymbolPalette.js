import { useMemo, useState } from '@wordpress/element';

import { SYMBOL_GROUPS } from '../data/symbols';
import SymbolButton from './SymbolButton';
import SymbolTabs from './SymbolTabs';

/**
 * Tabbed palette of insertable equation symbols.
 *
 * Tracks the active symbol group and renders its rows of {@link SymbolButton}s
 * below the group tabs.
 *
 * @param {Object}   props                Component props.
 * @param {Function} props.onInsertSymbol Called with the chosen symbol on click.
 * @return {Element} The symbol palette.
 */
export default function SymbolPalette( { onInsertSymbol } ) {
	const [ activeGroupId, setActiveGroupId ] = useState(
		SYMBOL_GROUPS[ 0 ].id
	);
	const activeGroup = useMemo(
		() =>
			SYMBOL_GROUPS.find( ( group ) => group.id === activeGroupId ) ||
			SYMBOL_GROUPS[ 0 ],
		[ activeGroupId ]
	);

	return (
		<div className="equation-editor-symbol-palette">
			<SymbolTabs
				activeGroupId={ activeGroup.id }
				groups={ SYMBOL_GROUPS }
				onSelectGroup={ setActiveGroupId }
			/>

			<div
				aria-labelledby={ `equation-editor-symbol-tab-${ activeGroup.id }` }
				className="equation-editor-symbol-panel"
				id={ `equation-editor-symbol-panel-${ activeGroup.id }` }
				role="tabpanel"
			>
				{ activeGroup.rows.map( ( row, rowIndex ) => (
					<div
						key={ `${ activeGroup.id }-${ rowIndex }` }
						className="equation-editor-symbol-row"
					>
						{ row.map( ( symbol ) => (
							<SymbolButton
								key={ symbol.id }
								symbol={ symbol }
								onInsert={ onInsertSymbol }
							/>
						) ) }
					</div>
				) ) }
			</div>
		</div>
	);
}
