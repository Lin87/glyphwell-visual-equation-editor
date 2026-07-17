/**
 * Data for the palette's Matrix tab, mirroring MathLive's native "Insert
 * Matrix" and "Borders" context-menu items but driven from the palette instead.
 *
 * Borders and row/column actions run through MathLive commands
 * (`mathfield.executeCommand(...)`); a fresh matrix is inserted as LaTeX via
 * {@link buildMatrixLatex}. See `MatrixPanel` for the wiring.
 */

import { __ } from '@wordpress/i18n';

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
 * re-tags the existing matrix in place without re-inserting it.
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
		ariaLabel: __( 'No border', 'glyphwell' ),
	},
	{
		id: 'parentheses',
		latex: '\\left(\\ddots\\right)',
		environment: 'pmatrix',
		ariaLabel: __( 'Parentheses border', 'glyphwell' ),
	},
	{
		id: 'brackets',
		latex: '\\left[\\ddots\\right]',
		environment: 'bmatrix',
		ariaLabel: __( 'Square bracket border', 'glyphwell' ),
	},
	{
		id: 'braces',
		latex: '\\left\\lbrace\\ddots\\right\\rbrace',
		environment: 'Bmatrix',
		ariaLabel: __( 'Curly brace border', 'glyphwell' ),
	},
	{
		id: 'bar',
		latex: '\\left\\vert\\ddots\\right\\vert',
		environment: 'vmatrix',
		ariaLabel: __( 'Single bar border', 'glyphwell' ),
	},
	{
		id: 'double-bar',
		latex: '\\left\\Vert\\ddots\\right\\Vert',
		environment: 'Vmatrix',
		ariaLabel: __( 'Double bar border', 'glyphwell' ),
	},
];

/**
 * Row/column edit actions for the matrix at the caret. Each `command` is a
 * MathLive command name run via `mathfield.executeCommand(...)`; they no-op
 * when the caret is not inside a matrix.
 *
 * @type {Array<{id: string, label: string, command: string, ariaLabel: string, destructive?: boolean}>}
 */
export const MATRIX_ACTIONS = [
	{
		id: 'add-row-above',
		label: __( 'Add Row above', 'glyphwell' ),
		command: 'addRowBefore',
		ariaLabel: __( 'Add row above', 'glyphwell' ),
	},
	{
		id: 'add-row-below',
		label: __( 'Add Row below', 'glyphwell' ),
		command: 'addRowAfter',
		ariaLabel: __( 'Add row below', 'glyphwell' ),
	},
	{
		id: 'add-column-before',
		label: __( 'Add Column left', 'glyphwell' ),
		command: 'addColumnBefore',
		ariaLabel: __( 'Add column to the left', 'glyphwell' ),
	},
	{
		id: 'add-column-after',
		label: __( 'Add Column right', 'glyphwell' ),
		command: 'addColumnAfter',
		ariaLabel: __( 'Add column to the right', 'glyphwell' ),
	},
	{
		id: 'delete-row',
		label: __( 'Delete row', 'glyphwell' ),
		command: 'removeRow',
		ariaLabel: __( 'Delete current row', 'glyphwell' ),
		destructive: true,
	},
	{
		id: 'delete-column',
		label: __( 'Delete column', 'glyphwell' ),
		command: 'removeColumn',
		ariaLabel: __( 'Delete current column', 'glyphwell' ),
		destructive: true,
	},
];
