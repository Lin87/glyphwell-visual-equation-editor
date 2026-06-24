<?php
/**
 * Shared helper for loading built script/style bundles.
 *
 * @package EquationEditor
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Registers or enqueues a built script bundle and its optional stylesheet.
 *
 * Resolves the `.js`, `.asset.php`, and `.css` files that wp-scripts emits for
 * a given entry point, then either registers them (for conditional enqueuing
 * later) or enqueues them immediately. Bails silently when the build output is
 * missing so the plugin degrades gracefully before its first build.
 *
 * @param string $handle    Handle shared by the script and its style.
 * @param string $build_dir Build subdirectory relative to the plugin root,
 *                          ending in a slash (e.g. 'build/frontend/').
 * @param string $base      Entry filename without extension (e.g. 'index').
 * @param bool   $register  When true, register only; when false, enqueue.
 * @return void
 */
function equation_editor_load_asset( string $handle, string $build_dir, string $base, bool $register ): void {
	$script_rel = $build_dir . $base . '.js';
	$asset_rel  = $build_dir . $base . '.asset.php';
	$style_rel  = $build_dir . $base . '.css';

	// A missing script or asset manifest means the plugin has not been built.
	if (
		! file_exists( EQUATION_EDITOR_PLUGIN_DIR . $script_rel )
		|| ! file_exists( EQUATION_EDITOR_PLUGIN_DIR . $asset_rel )
	) {
		return;
	}

	$asset_meta   = require EQUATION_EDITOR_PLUGIN_DIR . $asset_rel;
	$dependencies = $asset_meta['dependencies'] ?? array();
	$version      = $asset_meta['version'] ?? EQUATION_EDITOR_VERSION;
	$has_style    = file_exists( EQUATION_EDITOR_PLUGIN_DIR . $style_rel );

	if ( $register ) {
		wp_register_script( $handle, EQUATION_EDITOR_PLUGIN_URL . $script_rel, $dependencies, $version, true );

		if ( $has_style ) {
			wp_register_style( $handle, EQUATION_EDITOR_PLUGIN_URL . $style_rel, array(), $version );
		}

		return;
	}

	wp_enqueue_script( $handle, EQUATION_EDITOR_PLUGIN_URL . $script_rel, $dependencies, $version, true );

	if ( $has_style ) {
		wp_enqueue_style( $handle, EQUATION_EDITOR_PLUGIN_URL . $style_rel, array(), $version );
	}
}
