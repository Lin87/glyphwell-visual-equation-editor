<?php
/**
 * Frontend asset registration and conditional loading.
 *
 * @package Glyphwell
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Registers the KaTeX script and style for later conditional loading.
 */
function glyphwell_register_katex_assets(): void {
	glyphwell_load_asset(
		GLYPHWELL_KATEX_HANDLE,
		'build/frontend/',
		'katex',
		true
	);
}

add_action( 'init', 'glyphwell_register_katex_assets' );

/**
 * Enqueues the registered KaTeX script and style.
 */
function glyphwell_enqueue_katex_assets(): void {
	if ( wp_script_is( GLYPHWELL_KATEX_HANDLE, 'registered' ) ) {
		wp_enqueue_script( GLYPHWELL_KATEX_HANDLE );
	}

	if ( wp_style_is( GLYPHWELL_KATEX_HANDLE, 'registered' ) ) {
		wp_enqueue_style( GLYPHWELL_KATEX_HANDLE );
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
function glyphwell_content_has_inline_equation( string $content ): bool {
	return false !== strpos( $content, GLYPHWELL_INLINE_CLASS )
		&& false !== strpos( $content, GLYPHWELL_LATEX_ATTR );
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
function glyphwell_content_has_equation_block( string $content ): bool {
	return has_block( GLYPHWELL_BLOCK_NAME, $content )
		|| (
			false !== strpos( $content, GLYPHWELL_MATHML_CLASS )
			&& false !== strpos( $content, GLYPHWELL_LATEX_ATTR )
		);
}

/**
 * Enqueues the KaTeX assets for any post that contains saved equation markup.
 */
function glyphwell_maybe_enqueue_katex_assets(): void {
	// KaTeX is the sole renderer, so the assets are needed wherever equation
	// markup appears. Without a main query there is no post content to inspect,
	// so there is nothing to enqueue.
	if ( ! is_a( $GLOBALS['wp_query'] ?? null, 'WP_Query' ) ) {
		return;
	}

	foreach ( $GLOBALS['wp_query']->posts as $post ) {
		if ( ! isset( $post->post_content ) || ! is_string( $post->post_content ) ) {
			continue;
		}

		// Enqueue once as soon as any post in the query contains an equation.
		if (
			glyphwell_content_has_equation_block( $post->post_content )
			|| glyphwell_content_has_inline_equation( $post->post_content )
		) {
			glyphwell_enqueue_katex_assets();
			return;
		}
	}
}

add_action( 'wp_enqueue_scripts', 'glyphwell_maybe_enqueue_katex_assets' );
