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
 * Registers the KaTeX fallback script and style for later conditional loading.
 */
function equation_editor_register_katex_fallback_assets(): void {
	equation_editor_load_asset(
		EQUATION_EDITOR_FALLBACK_HANDLE,
		'build/frontend/',
		'katex-fallback',
		true
	);
}
add_action( 'init', 'equation_editor_register_katex_fallback_assets' );

/**
 * Enqueues the registered KaTeX fallback script and style.
 */
function equation_editor_enqueue_katex_fallback_assets(): void {
	if ( wp_script_is( EQUATION_EDITOR_FALLBACK_HANDLE, 'registered' ) ) {
		wp_enqueue_script( EQUATION_EDITOR_FALLBACK_HANDLE );
	}

	if ( wp_style_is( EQUATION_EDITOR_FALLBACK_HANDLE, 'registered' ) ) {
		wp_enqueue_style( EQUATION_EDITOR_FALLBACK_HANDLE );
	}
}

/**
 * Checks whether post content contains saved inline equation markup.
 *
 * Inline equations carry both the inline marker class and the LaTeX data
 * attribute, so both must be present to count as a match.
 *
 * @param string $content Post content.
 * @return bool True when inline equation markup is present.
 */
function equation_editor_content_has_inline_equation( string $content ): bool {
	return false !== strpos( $content, EQUATION_EDITOR_INLINE_CLASS )
		&& false !== strpos( $content, EQUATION_EDITOR_LATEX_ATTR );
}

/**
 * Checks whether post content contains a saved standalone equation block.
 *
 * Detects both the current block (via has_block) and legacy saved markup that
 * predates block registration, identified by its MathML class plus LaTeX attr.
 *
 * @param string $content Post content.
 * @return bool True when an equation block is present.
 */
function equation_editor_content_has_equation_block( string $content ): bool {
	return has_block( EQUATION_EDITOR_BLOCK_NAME, $content )
		|| (
			false !== strpos( $content, EQUATION_EDITOR_MATHML_CLASS )
			&& false !== strpos( $content, EQUATION_EDITOR_LATEX_ATTR )
		);
}

/**
 * Enqueues fallback assets for saved equations on sites without core math support.
 */
function equation_editor_maybe_enqueue_fallback_assets(): void {
	// Core math support renders equations natively, and without a main query
	// there is no post content to inspect, so in both cases there is nothing
	// to enqueue.
	if ( equation_editor_has_core_math_support() || ! is_a( $GLOBALS['wp_query'] ?? null, 'WP_Query' ) ) {
		return;
	}

	foreach ( $GLOBALS['wp_query']->posts as $post ) {
		if ( ! isset( $post->post_content ) || ! is_string( $post->post_content ) ) {
			continue;
		}

		// Enqueue once as soon as any post in the query needs the fallback.
		if (
			equation_editor_content_has_equation_block( $post->post_content )
			|| equation_editor_content_has_inline_equation( $post->post_content )
		) {
			equation_editor_enqueue_katex_fallback_assets();
			return;
		}
	}
}
add_action( 'wp_enqueue_scripts', 'equation_editor_maybe_enqueue_fallback_assets' );
