<?php
/**
 * Frontend asset registration and conditional loading.
 *
 * @package EquationEditor
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Registers frontend assets for targeted KaTeX fallback rendering.
 */
function equation_editor_register_frontend_assets(): void {
	$script_path = EQUATION_EDITOR_PLUGIN_DIR . 'build/frontend/katex-fallback.js';
	$asset_path  = EQUATION_EDITOR_PLUGIN_DIR . 'build/frontend/katex-fallback.asset.php';
	$style_path  = EQUATION_EDITOR_PLUGIN_DIR . 'build/frontend/katex-fallback.css';

	if ( ! file_exists( $script_path ) || ! file_exists( $asset_path ) ) {
		return;
	}

	$asset = require $asset_path;

	wp_register_script(
		'equation-editor-katex-fallback',
		EQUATION_EDITOR_PLUGIN_URL . 'build/frontend/katex-fallback.js',
		$asset['dependencies'] ?? array(),
		$asset['version'] ?? EQUATION_EDITOR_VERSION,
		true
	);

	if ( file_exists( $style_path ) ) {
		wp_register_style(
			'equation-editor-katex-fallback',
			EQUATION_EDITOR_PLUGIN_URL . 'build/frontend/katex-fallback.css',
			array(),
			$asset['version'] ?? EQUATION_EDITOR_VERSION
		);
	}
}
add_action( 'init', 'equation_editor_register_frontend_assets' );

/**
 * Enqueues frontend KaTeX fallback assets if they have been registered.
 */
function equation_editor_enqueue_katex_fallback_assets(): void {
	if ( wp_script_is( 'equation-editor-katex-fallback', 'registered' ) ) {
		wp_enqueue_script( 'equation-editor-katex-fallback' );
	}

	if ( wp_style_is( 'equation-editor-katex-fallback', 'registered' ) ) {
		wp_enqueue_style( 'equation-editor-katex-fallback' );
	}
}

/**
 * Checks whether post content contains a saved inline equation token.
 *
 * @param string $content Post content.
 * @return bool True when inline equation markup is present.
 */
function equation_editor_content_has_inline_equation( string $content ): bool {
	return false !== strpos( $content, 'equation-editor-inline' )
		&& false !== strpos( $content, 'data-equation-editor-latex' );
}

/**
 * Enqueues fallback assets for saved inline equations on sites without core math support.
 */
function equation_editor_enqueue_inline_equation_fallback_assets(): void {
	if ( equation_editor_has_core_math_support() || ! is_a( $GLOBALS['wp_query'] ?? null, 'WP_Query' ) ) {
		return;
	}

	foreach ( $GLOBALS['wp_query']->posts as $post ) {
		if ( ! isset( $post->post_content ) || ! is_string( $post->post_content ) ) {
			continue;
		}

		if ( equation_editor_content_has_inline_equation( $post->post_content ) ) {
			equation_editor_enqueue_katex_fallback_assets();
			return;
		}
	}
}
add_action( 'wp_enqueue_scripts', 'equation_editor_enqueue_inline_equation_fallback_assets' );
