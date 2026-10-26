<?php
/**
 * Plugin Name: Glyphwell - Visual Equation Editor
 * Description: Adds a WYSIWYG equation block and inline equation formatting to the block editor.
 * Author: Ethan Lin
 * Author URI: https://profiles.wordpress.org/eslin87/
 * Text Domain:  glyphwell
 * Domain Path: /languages
 * Version: 1.0.1
 * Requires at least: 6.0
 * Requires PHP: 8.0
 * License: GPL-2.0-or-later
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 *
 * @package Glyphwell
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

define( 'GLYPHWELL_VERSION', '1.0.1' );
define( 'GLYPHWELL_PLUGIN_FILE', __FILE__ );
define( 'GLYPHWELL_PLUGIN_DIR', plugin_dir_path( __FILE__ ) );
define( 'GLYPHWELL_PLUGIN_URL', plugin_dir_url( __FILE__ ) );

require_once GLYPHWELL_PLUGIN_DIR . 'includes/constants.php';
require_once GLYPHWELL_PLUGIN_DIR . 'includes/asset-loader.php';
require_once GLYPHWELL_PLUGIN_DIR . 'includes/assets.php';
require_once GLYPHWELL_PLUGIN_DIR . 'includes/blocks.php';
require_once GLYPHWELL_PLUGIN_DIR . 'includes/inline-format.php';
require_once GLYPHWELL_PLUGIN_DIR . 'includes/sanitization.php';
