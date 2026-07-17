<?php
/**
 * Shared identifiers and string constants.
 *
 * These values form the contract between the editor scripts that emit equation
 * markup (mirrored in `src/constants.js`) and the PHP that detects and
 * sanitizes it. Keep both files in sync.
 *
 * @package Glyphwell
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

// Block and rich-text format names.
define( 'GLYPHWELL_BLOCK_NAME', 'glyphwell/equation' );

// Data attribute holding the raw LaTeX source on saved equation markup.
define( 'GLYPHWELL_LATEX_ATTR', 'data-glyphwell-latex' );

// CSS classes marking the different equation renderings.
define( 'GLYPHWELL_MATHML_CLASS', 'glyphwell__mathml' );
define( 'GLYPHWELL_INLINE_CLASS', 'glyphwell-inline' );
define( 'GLYPHWELL_FALLBACK_CLASS', 'glyphwell__fallback' );

// Script/style handles registered with WordPress.
define( 'GLYPHWELL_KATEX_HANDLE', 'glyphwell-katex' );
define( 'GLYPHWELL_INLINE_FORMAT_HANDLE', 'glyphwell-inline-format' );
