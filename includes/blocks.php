<?php
/**
 * Block registration.
 *
 * @package EquationEditor
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Registers the equation block when its built metadata is available.
 */
function equation_editor_register_blocks(): void {
	$block_path = EQUATION_EDITOR_PLUGIN_DIR . 'build/blocks/equation';

	if ( file_exists( $block_path . '/block.json' ) ) {
		register_block_type_from_metadata( $block_path );
	}
}
add_action( 'init', 'equation_editor_register_blocks' );
