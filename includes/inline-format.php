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
	$script_path = EQUATION_EDITOR_PLUGIN_DIR . 'build/formats/inline-equation/index.js';
	$asset_path  = EQUATION_EDITOR_PLUGIN_DIR . 'build/formats/inline-equation/index.asset.php';
	$style_path  = EQUATION_EDITOR_PLUGIN_DIR . 'build/formats/inline-equation/index.css';

	if ( ! file_exists( $script_path ) || ! file_exists( $asset_path ) ) {
		return;
	}

	$asset = require $asset_path;

	wp_enqueue_script(
		'equation-editor-inline-format',
		EQUATION_EDITOR_PLUGIN_URL . 'build/formats/inline-equation/index.js',
		$asset['dependencies'] ?? array(),
		$asset['version'] ?? EQUATION_EDITOR_VERSION,
		true
	);

	if ( file_exists( $style_path ) ) {
		wp_enqueue_style(
			'equation-editor-inline-format',
			EQUATION_EDITOR_PLUGIN_URL . 'build/formats/inline-equation/index.css',
			array(),
			$asset['version'] ?? EQUATION_EDITOR_VERSION
		);
	}
}
add_action( 'enqueue_block_editor_assets', 'equation_editor_enqueue_inline_format_assets' );
