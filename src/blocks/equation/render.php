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

if ( equation_editor_has_core_math_support() && '' !== trim( $mathml ) ) {
	$equation_markup = sprintf(
		'<div class="%1$s">%2$s</div>',
		esc_attr( EQUATION_EDITOR_MATHML_CLASS ),
		equation_editor_sanitize_mathml( $mathml )
	);
} else {
	equation_editor_enqueue_katex_fallback_assets();

	$equation_markup = sprintf(
		'<span class="%1$s" data-display-mode="block" data-latex="%2$s">%3$s</span>',
		esc_attr( EQUATION_EDITOR_FALLBACK_CLASS ),
		esc_attr( $latex ),
		esc_html( $latex )
	);
}

return sprintf(
	'<figure %1$s>%2$s</figure>',
	$wrapper_attributes,
	$equation_markup
);
