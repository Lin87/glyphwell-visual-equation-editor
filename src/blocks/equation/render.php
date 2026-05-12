<?php
/**
 * Placeholder render callback for the Equation block.
 *
 * @package EquationEditor
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$alignment = isset( $attributes['textAlign'] ) ? $attributes['textAlign'] : 'center';

if ( ! in_array( $alignment, array( 'left', 'center', 'right' ), true ) ) {
	$alignment = 'center';
}

$wrapper_attributes = get_block_wrapper_attributes(
	array(
		'class' => 'equation-editor-equation has-text-align-' . $alignment,
	)
);

return sprintf(
	'<figure %1$s><span class="equation-editor__placeholder">%2$s</span></figure>',
	$wrapper_attributes,
	esc_html( 'Equation placeholder' )
);
