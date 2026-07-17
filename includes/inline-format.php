<?php
/**
 * Inline equation format registration.
 *
 * @package Glyphwell
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Enqueues the inline equation rich-text format assets in the block editor.
 */
function glyphwell_enqueue_inline_format_assets(): void {
	glyphwell_load_asset(
		GLYPHWELL_INLINE_FORMAT_HANDLE,
		'build/formats/inline-equation/',
		'index',
		false
	);

	// Load the JS translations for the inline format's editor bundle.
	wp_set_script_translations(
		GLYPHWELL_INLINE_FORMAT_HANDLE,
		'glyphwell',
		GLYPHWELL_PLUGIN_DIR . 'languages'
	);
}

add_action( 'enqueue_block_editor_assets', 'glyphwell_enqueue_inline_format_assets' );
