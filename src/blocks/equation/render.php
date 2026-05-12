<?php
/**
 * Render callback for the Equation block.
 *
 * @package EquationEditor
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$latex     = isset( $attributes['latex'] ) && is_string( $attributes['latex'] ) ? $attributes['latex'] : '';
$mathml    = isset( $attributes['mathML'] ) && is_string( $attributes['mathML'] ) ? $attributes['mathML'] : '';
$alignment = isset( $attributes['textAlign'] ) && is_string( $attributes['textAlign'] ) ? $attributes['textAlign'] : 'center';

if ( '' === trim( $latex ) && '' === trim( $mathml ) ) {
	return '';
}

if ( ! in_array( $alignment, array( 'left', 'center', 'right' ), true ) ) {
	$alignment = 'center';
}

$wrapper_attributes = get_block_wrapper_attributes(
	array(
		'class' => 'equation-editor-equation has-text-align-' . $alignment,
	)
);

if ( '' !== trim( $mathml ) ) {
	$equation_markup = sprintf(
		'<div class="equation-editor__mathml">%s</div>',
		equation_editor_sanitize_mathml( $mathml )
	);
} else {
	$equation_markup = sprintf(
		'<span class="equation-editor__fallback">%s</span>',
		esc_html( $latex )
	);
}

return sprintf(
	'<figure %1$s>%2$s</figure>',
	$wrapper_attributes,
	$equation_markup
);
