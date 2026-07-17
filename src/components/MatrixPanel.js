import { useMemo, useState } from '@wordpress/element';
import { __, sprintf } from '@wordpress/i18n';
import katex from 'katex';

import {
	BORDER_OPTIONS,
	MATRIX_ACTIONS,
	MATRIX_MAX_SIZE,
	buildMatrixLatex,
} from '../data/matrix';

/**
 * KaTeX options for the small border preview glyphs. Mirrors the inline
 * (non-display) rendering used by the palette's symbol buttons.
 */
const KATEX_OPTIONS = {
	throwOnError: false,
	output: 'htmlAndMathml',
	trust: false,
	displayMode: false,
};

/**
 * Renders a border option's preview LaTeX to KaTeX markup.
 *
 * @param {string} latex The preview LaTeX.
 * @return {string} The KaTeX HTML/MathML markup, or an empty string on failure.
 */
const renderGlyph = ( latex ) => {
	try {
		return katex.renderToString( latex, KATEX_OPTIONS );
	} catch {
		return '';
	}
};

/**
 * A single cell in the interactive matrix size grid.
 *
 * @param {Object}   props            Component props.
 * @param {number}   props.row        This cell's 1-based row.
 * @param {number}   props.col        This cell's 1-based column.
 * @param {boolean}  props.active     Whether the cell is within the hovered block.
 * @param {Function} props.onActivate Called with { rows, cols } on hover/focus.
 * @param {Function} props.onSelect   Called with { rows, cols } on click.
 * @return {Element} The cell button.
 */
function SizeCell( { row, col, active, onActivate, onSelect } ) {
	return (
		<button
			type="button"
			aria-label={ sprintf(
				/* translators: 1: number of rows, 2: number of columns. */
				__( 'Insert %1$d by %2$d matrix', 'glyphwell' ),
				row,
				col
			) }
			className={ `glyphwell-matrix-size-cell${
				active ? ' is-active' : ''
			}` }
			onClick={ () => onSelect( { rows: row, cols: col } ) }
			onFocus={ () => onActivate( { rows: row, cols: col } ) }
			onMouseEnter={ () => onActivate( { rows: row, cols: col } ) }
		/>
	);
}

/**
 * Custom palette panel replicating MathLive's "Insert Matrix" and "Borders"
 * context-menu items, plus row/column editing.
 *
 * Inserting a matrix builds LaTeX and inserts it via `onInsertLatex`; borders
 * and row/column edits run MathLive commands via `onRunCommand` against the
 * matrix the caret is currently in (they no-op elsewhere).
 *
 * @param {Object}   props               Component props.
 * @param {Function} props.onInsertLatex Called with matrix LaTeX to insert.
 * @param {Function} props.onRunCommand  Called with a MathLive command (string or [name, ...args]).
 * @return {Element} The matrix panel.
 */
export default function MatrixPanel( { onInsertLatex, onRunCommand } ) {
	const [ hovered, setHovered ] = useState( { rows: 0, cols: 0 } );

	// 1-based row/column indices for the size grid.
	const sizes = useMemo(
		() =>
			Array.from( { length: MATRIX_MAX_SIZE }, ( _unused, i ) => i + 1 ),
		[]
	);

	const borderGlyphs = useMemo(
		() =>
			BORDER_OPTIONS.map( ( option ) => ( {
				...option,
				markup: renderGlyph( option.latex ),
			} ) ),
		[]
	);

	const sizeLabel =
		hovered.rows > 0
			? `${ hovered.rows } × ${ hovered.cols }`
			: __( 'Pick a size', 'glyphwell' );

	return (
		<div className="glyphwell-matrix-panel">
			<div className="glyphwell-matrix-section">
				<div className="glyphwell-matrix-section__heading">
					{ __( 'Insert matrix', 'glyphwell' ) }
				</div>

				<div
					className="glyphwell-matrix-size-grid"
					onMouseLeave={ () => setHovered( { rows: 0, cols: 0 } ) }
					style={ {
						gridTemplateColumns: `repeat(${ MATRIX_MAX_SIZE }, 1fr)`,
					} }
				>
					{ sizes.map( ( row ) =>
						sizes.map( ( col ) => (
							<SizeCell
								key={ `${ row }x${ col }` }
								row={ row }
								col={ col }
								active={
									row <= hovered.rows && col <= hovered.cols
								}
								onActivate={ setHovered }
								onSelect={ ( { rows, cols } ) =>
									onInsertLatex(
										buildMatrixLatex( rows, cols )
									)
								}
							/>
						) )
					) }
				</div>

				<div
					aria-hidden="true"
					className="glyphwell-matrix-size-label"
				>
					{ sizeLabel }
				</div>
			</div>

			<div className="glyphwell-matrix-section">
				<div className="glyphwell-matrix-section__heading">
					{ __( 'Borders', 'glyphwell' ) }
				</div>

				<div className="glyphwell-matrix-borders">
					{ borderGlyphs.map( ( option ) => (
						<button
							key={ option.id }
							type="button"
							aria-label={ option.ariaLabel }
							className="glyphwell-matrix-border-button"
							onClick={ () =>
								onRunCommand( [
									'setEnvironment',
									option.environment,
								] )
							}
						>
							{ option.markup ? (
								<span
									dangerouslySetInnerHTML={ {
										__html: option.markup,
									} }
								/>
							) : (
								option.ariaLabel
							) }
						</button>
					) ) }
				</div>
			</div>

			<div className="glyphwell-matrix-section full-width">
				<div className="glyphwell-matrix-section__heading">
					{ __( 'Rows & columns', 'glyphwell' ) }
				</div>

				<div className="glyphwell-matrix-actions">
					{ MATRIX_ACTIONS.map( ( action ) => (
						<button
							key={ action.id }
							type="button"
							aria-label={ action.ariaLabel }
							className={ `glyphwell-matrix-action-button${
								action.destructive ? ' is-destructive' : ''
							}` }
							onClick={ () => onRunCommand( action.command ) }
						>
							{ action.label }
						</button>
					) ) }
				</div>
			</div>

			<p className="glyphwell-matrix-hint full-width">
				{ __(
					'Place the cursor inside a matrix to change its borders or add and remove rows and columns.',
					'glyphwell'
				) }
			</p>
		</div>
	);
}
