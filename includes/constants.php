<?php
/**
 * Shared identifiers and string constants.
 *
 * These values form the contract between the editor scripts that emit equation
 * markup (mirrored in `src/constants.js`) and the PHP that detects and
 * sanitizes it. Keep both files in sync.
 *
 * @package EquationEditor
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

// Block and rich-text format names.
define( 'EQUATION_EDITOR_BLOCK_NAME', 'equation-editor/equation' );

// Data attribute holding the raw LaTeX source on saved equation markup.
define( 'EQUATION_EDITOR_LATEX_ATTR', 'data-equation-editor-latex' );

// CSS classes marking the different equation renderings.
define( 'EQUATION_EDITOR_MATHML_CLASS', 'equation-editor__mathml' );
define( 'EQUATION_EDITOR_INLINE_CLASS', 'equation-editor-inline' );
define( 'EQUATION_EDITOR_FALLBACK_CLASS', 'equation-editor__fallback' );

// Script/style handles registered with WordPress.
define( 'EQUATION_EDITOR_KATEX_HANDLE', 'equation-editor-katex' );
define( 'EQUATION_EDITOR_INLINE_FORMAT_HANDLE', 'equation-editor-inline-format' );
