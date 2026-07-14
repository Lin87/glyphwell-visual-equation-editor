import { useMemo, useState } from '@wordpress/element';

import { SYMBOL_GROUPS } from '../data/symbols';
import MatrixPanel from './MatrixPanel';
import SymbolButton from './SymbolButton';
import SymbolTabs from './SymbolTabs';

/**
 * Tabbed palette of insertable equation symbols.
 *
 * Tracks the active symbol group and renders its {@link SymbolButton}s in a
 * wrapping grid below the group tabs. Groups flagged `type: 'matrix'` render a
 * custom {@link MatrixPanel} instead of the glyph grid.
 *
 * @param {Object}   props                Component props.
 * @param {Function} props.onInsertSymbol Called with the chosen symbol on click.
 * @param {Function} props.onInsertLatex  Called with raw LaTeX to insert (matrix panel).
 * @param {Function} props.onRunCommand   Called with a MathLive command (matrix panel).
 * @return {Element} The symbol palette.
 */
export default function SymbolPalette( {
	onInsertSymbol,
	onInsertLatex,
	onRunCommand,
} ) {
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
				{ activeGroup.type === 'matrix' ? (
					<MatrixPanel
						onInsertLatex={ onInsertLatex }
						onRunCommand={ onRunCommand }
					/>
				) : (
					<div className="equation-editor-symbol-grid">
						{ activeGroup.symbols.map( ( symbol ) => (
							<SymbolButton
								key={ symbol.id }
								symbol={ symbol }
								onInsert={ onInsertSymbol }
							/>
						) ) }
					</div>
				) }
			</div>
		</div>
	);
}
