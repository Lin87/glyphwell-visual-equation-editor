<?php
/**
 * WordPress math support detection.
 *
 * @package EquationEditor
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Determines whether WordPress core math rendering support is available.
 *
 * @return bool True when core math support is available.
 */
function equation_editor_has_core_math_support(): bool {
	if ( version_compare( get_bloginfo( 'version' ), '6.9', '<' ) ) {
		return false;
	}

	if ( ! class_exists( 'WP_Block_Type_Registry' ) ) {
		return false;
	}

	return WP_Block_Type_Registry::get_instance()->is_registered( 'core/math' );
}
