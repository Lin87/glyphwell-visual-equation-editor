/**
 * Data for the palette's Matrix tab, mirroring MathLive's native "Insert
 * Matrix" and "Borders" context-menu items but driven from the palette instead.
 *
 * Borders and row/column actions run through MathLive commands
 * (`mathfield.executeCommand(...)`); a fresh matrix is inserted as LaTeX via
 * {@link buildMatrixLatex}. See `MatrixPanel` for the wiring.
 */

/**
 * Largest matrix the interactive size grid can insert (rows and columns).
 *
 * @type {number}
 */
export const MATRIX_MAX_SIZE = 5;

/**
 * Builds the LaTeX for an empty `rows`×`cols` matrix, mirroring MathLive's own
 * Insert Matrix action (a `pmatrix` of `#?` placeholders). `&` separates
 * columns and `\\` separates rows; the border can then be changed via the
 * Borders buttons (`setEnvironment`).
 *
 * @param {number} rows Number of rows (>= 1).
 * @param {number} cols Number of columns (>= 1).
 * @return {string} The matrix LaTeX.
 */
export const buildMatrixLatex = ( rows, cols ) => {
	const row = Array( cols ).fill( '#?' ).join( ' & ' );
	const body = Array( rows ).fill( row ).join( '\\\\' );

	return `\\begin{pmatrix}${ body }\\end{pmatrix}`;
};

/**
 * Border (delimiter) options for the matrix at the caret. Each maps to a
 * MathLive matrix environment applied via the `setEnvironment` command, which
 * retags the existing matrix in place without re-inserting it.
 *
 * `latex` is a KaTeX-renderable preview glyph; `environment` is the value
 * passed to `setEnvironment`.
 *
 * @type {Array<{id: string, latex: string, environment: string, ariaLabel: string}>}
 */
export const BORDER_OPTIONS = [
	{
		id: 'no-border',
		latex: '\\ddots',
		environment: 'matrix',
		ariaLabel: 'No border',
	},
	{
		id: 'parentheses',
		latex: '\\left(\\ddots\\right)',
		environment: 'pmatrix',
		ariaLabel: 'Parentheses border',
	},
	{
		id: 'brackets',
		latex: '\\left[\\ddots\\right]',
		environment: 'bmatrix',
		ariaLabel: 'Square bracket border',
	},
	{
		id: 'braces',
		latex: '\\left\\lbrace\\ddots\\right\\rbrace',
		environment: 'Bmatrix',
		ariaLabel: 'Curly brace border',
	},
	{
		id: 'bar',
		latex: '\\left\\vert\\ddots\\right\\vert',
		environment: 'vmatrix',
		ariaLabel: 'Single bar border',
	},
	{
		id: 'double-bar',
		latex: '\\left\\Vert\\ddots\\right\\Vert',
		environment: 'Vmatrix',
		ariaLabel: 'Double bar border',
	},
];

/**
 * Row/column edit actions for the matrix at the caret. Each `command` is a
 * MathLive command name run via `mathfield.executeCommand(...)`; they no-op
 * when the caret is not inside a matrix.
 *
 * @type {Array<{id: string, label: string, command: string, ariaLabel: string}>}
 */
export const MATRIX_ACTIONS = [
	{
		id: 'add-row-above',
		label: 'Add Row above',
		command: 'addRowBefore',
		ariaLabel: 'Add row above',
	},
	{
		id: 'add-row-below',
		label: 'Add Row below',
		command: 'addRowAfter',
		ariaLabel: 'Add row below',
	},
	{
		id: 'add-column-before',
		label: 'Add Column left',
		command: 'addColumnBefore',
		ariaLabel: 'Add column to the left',
	},
	{
		id: 'add-column-after',
		label: 'Add Column right',
		command: 'addColumnAfter',
		ariaLabel: 'Add column to the right',
	},
	{
		id: 'delete-row',
		label: 'Delete row',
		command: 'removeRow',
		ariaLabel: 'Delete current row',
	},
	{
		id: 'delete-column',
		label: 'Delete column',
		command: 'removeColumn',
		ariaLabel: 'Delete current column',
	},
];
