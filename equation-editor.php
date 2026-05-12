<?php
/**
 * Plugin Name: Equation Editor
 * Description: Adds a scaffold for Equation Editor block and inline equation authoring.
 * Version: 0.1.0
 * Requires at least: 6.3
 * Requires PHP: 8.0
 * License: GPL-2.0-or-later
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 *
 * @package EquationEditor
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

define( 'EQUATION_EDITOR_VERSION', '0.1.0' );
define( 'EQUATION_EDITOR_PLUGIN_FILE', __FILE__ );
define( 'EQUATION_EDITOR_PLUGIN_DIR', plugin_dir_path( __FILE__ ) );
define( 'EQUATION_EDITOR_PLUGIN_URL', plugin_dir_url( __FILE__ ) );

require_once EQUATION_EDITOR_PLUGIN_DIR . 'includes/assets.php';
require_once EQUATION_EDITOR_PLUGIN_DIR . 'includes/blocks.php';
require_once EQUATION_EDITOR_PLUGIN_DIR . 'includes/inline-format.php';
require_once EQUATION_EDITOR_PLUGIN_DIR . 'includes/math-support.php';
require_once EQUATION_EDITOR_PLUGIN_DIR . 'includes/sanitization.php';
