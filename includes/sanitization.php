<?php
/**
 * Sanitization helpers.
 *
 * @package EquationEditor
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Returns the safe MathML elements and attributes the plugin may output.
 *
 * @return array<string,array<string,bool>>
 */
function equation_editor_allowed_mathml_tags(): array {
	$common_attributes = array(
		'class'        => true,
		'displaystyle' => true,
		'mathvariant'  => true,
		'scriptlevel'  => true,
	);

	$operator_attributes = array_merge(
		$common_attributes,
		array(
			'accent'        => true,
			'accentunder'   => true,
			'fence'         => true,
			'form'          => true,
			'largeop'       => true,
			'lspace'        => true,
			'maxsize'       => true,
			'minsize'       => true,
			'movablelimits' => true,
			'rspace'        => true,
			'separator'     => true,
			'stretchy'      => true,
			'symmetric'     => true,
		)
	);

	$table_attributes = array_merge(
		$common_attributes,
		array(
			'columnalign'   => true,
			'columnspacing' => true,
			'rowalign'      => true,
			'rowspacing'    => true,
		)
	);

	return array(
		'annotation' => array(
			'class'    => true,
			'encoding' => true,
		),
		'math'       => array(
			'class'   => true,
			'display' => true,
			'xmlns'   => true,
		),
		'merror'     => $common_attributes,
		'mfrac'      => array_merge(
			$common_attributes,
			array(
				'linethickness' => true,
			)
		),
		'mi'         => $common_attributes,
		'mmultiscripts' => $common_attributes,
		'mn'         => $common_attributes,
		'mo'         => $operator_attributes,
		'mover'      => $operator_attributes,
		'mpadded'    => array_merge(
			$common_attributes,
			array(
				'depth'  => true,
				'height' => true,
				'lspace' => true,
				'width'  => true,
			)
		),
		'mphantom'   => $common_attributes,
		'mprescripts' => $common_attributes,
		'mroot'      => $common_attributes,
		'mrow'       => $common_attributes,
		'ms'         => $common_attributes,
		'mspace'     => array_merge(
			$common_attributes,
			array(
				'depth'  => true,
				'height' => true,
				'width'  => true,
			)
		),
		'msqrt'      => $common_attributes,
		'mstyle'     => $common_attributes,
		'msub'       => $common_attributes,
		'msubsup'    => $common_attributes,
		'msup'       => $common_attributes,
		'mtable'     => $table_attributes,
		'mtd'        => $table_attributes,
		'mtext'      => $common_attributes,
		'mtr'        => $table_attributes,
		'munder'     => $operator_attributes,
		'munderover' => $operator_attributes,
		'none'       => $common_attributes,
		'semantics'  => $common_attributes,
	);
}

/**
 * Sanitizes MathML before output.
 *
 * @param string $mathml MathML markup.
 * @return string Sanitized MathML markup.
 */
function equation_editor_sanitize_mathml( string $mathml ): string {
	return wp_kses( $mathml, equation_editor_allowed_mathml_tags() );
}

/**
 * Extends post content KSES rules with safe MathML and inline equation attrs.
 *
 * @param array<string,array<string,bool>> $tags    Allowed tags.
 * @param string                           $context KSES context.
 * @return array<string,array<string,bool>> Filtered allowed tags.
 */
function equation_editor_extend_allowed_post_tags( array $tags, string $context ): array {
	if ( 'post' !== $context ) {
		return $tags;
	}

	foreach ( equation_editor_allowed_mathml_tags() as $tag_name => $attributes ) {
		$tags[ $tag_name ] = isset( $tags[ $tag_name ] )
			? array_merge( $tags[ $tag_name ], $attributes )
			: $attributes;
	}

	$tags['math']['data-equation-editor-latex'] = true;

	return $tags;
}
add_filter( 'wp_kses_allowed_html', 'equation_editor_extend_allowed_post_tags', 10, 2 );
