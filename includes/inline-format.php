<?php
/**
 * Inline equation format registration.
 *
 * @package EquationEditor
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Enqueues the inline equation rich-text format assets in the block editor.
 */
function equation_editor_enqueue_inline_format_assets(): void {
	equation_editor_load_asset(
		EQUATION_EDITOR_INLINE_FORMAT_HANDLE,
		'build/formats/inline-equation/',
		'index',
		false
	);

	// Load the JS translations for the inline format's editor bundle.
	wp_set_script_translations(
		EQUATION_EDITOR_INLINE_FORMAT_HANDLE,
		'equation-editor',
		EQUATION_EDITOR_PLUGIN_DIR . 'languages'
	);
}
add_action( 'enqueue_block_editor_assets', 'equation_editor_enqueue_inline_format_assets' );
