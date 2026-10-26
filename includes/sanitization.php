<?php
/**
 * Sanitization helpers.
 *
 * @package Glyphwell
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Returns the safe MathML elements and attributes the plugin may output.
 *
 * @return array<string,array<string,bool>>
 */
function glyphwell_allowed_mathml_tags(): array {
	$common_attributes = array(
		'class'        => true,
		'displaystyle' => true,
		'mathvariant'  => true,
		'scriptlevel'  => true,
	);

	// Free-form dimension and spacing attributes are deliberately excluded so
	// saved MathML cannot stretch or overlap surrounding page content.
	$operator_attributes = array_merge(
		$common_attributes,
		array(
			'accent'        => true,
			'accentunder'   => true,
			'fence'         => true,
			'form'          => true,
			'largeop'       => true,
			'movablelimits' => true,
			'separator'     => true,
			'stretchy'      => true,
			'symmetric'     => true,
		)
	);

	$table_attributes = array_merge(
		$common_attributes,
		array(
			'columnalign' => true,
			'rowalign'    => true,
		)
	);

	return array(
		'annotation' => array(
			'class'    => true,
			'encoding' => true,
		),
		'math'       => array(
			'class'              => true,
			'display'            => true,
			'xmlns'              => true,
			GLYPHWELL_LATEX_ATTR => true,
		),
		'merror'     => $common_attributes,
		'mfrac'      => $common_attributes,
		'mi'         => $common_attributes,
		'mmultiscripts' => $common_attributes,
		'mn'         => $common_attributes,
		'mo'         => $operator_attributes,
		'mover'      => $operator_attributes,
		'mpadded'    => $common_attributes,
		'mphantom'   => $common_attributes,
		'mprescripts' => $common_attributes,
		'mroot'      => $common_attributes,
		'mrow'       => $common_attributes,
		'ms'         => $common_attributes,
		'mspace'     => $common_attributes,
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
function glyphwell_sanitize_mathml( string $mathml ): string {
	return wp_kses( $mathml, glyphwell_allowed_mathml_tags() );
}

/**
 * Sanitizes every saved equation `<math>` element within rendered markup.
 *
 * @param string $content Rendered HTML.
 * @return string HTML with each equation's MathML sanitized.
 */
function glyphwell_sanitize_equation_markup( string $content ): string {
	if ( false === strpos( $content, GLYPHWELL_LATEX_ATTR ) ) {
		return $content;
	}

	$sanitized = preg_replace_callback(
		'#(<math\b(?:[^>"\']|"[^"]*"|\'[^\']*\')*>)(.*?</math\s*>)#is',
		static function ( array $matches ): string {
			if ( false === strpos( $matches[1], GLYPHWELL_LATEX_ATTR ) ) {
				return $matches[0];
			}

			// Older editors saved LaTeX `<` unescaped in the attribute, which KSES would mangle.
			$open_tag = preg_replace_callback(
				'#"[^"]*"|\'[^\']*\'#',
				static fn( array $value ): string => str_replace( array( '<', '>' ), array( '&lt;', '&gt;' ), $value[0] ),
				$matches[1]
			);

			return glyphwell_sanitize_mathml( $open_tag . $matches[2] );
		},
		$content
	);

	return $sanitized ?? $content;
}

/**
 * Sanitizes equation markup in each block as it is rendered.
 *
 * @param mixed $block_content Rendered block HTML.
 * @return mixed Block HTML with equation markup sanitized.
 */
function glyphwell_filter_rendered_block( $block_content ) {
	return is_string( $block_content )
		? glyphwell_sanitize_equation_markup( $block_content )
		: $block_content;
}

add_filter( 'render_block', 'glyphwell_filter_rendered_block' );

/**
 * Extends post content KSES rules with safe MathML and inline equation attrs.
 *
 * @param array<string,array<string,bool>> $tags    Allowed tags.
 * @param string                           $context KSES context.
 * @return array<string,array<string,bool>> Filtered allowed tags.
 */
function glyphwell_extend_allowed_post_tags( array $tags, string $context ): array {
	if ( 'post' !== $context ) {
		return $tags;
	}

	foreach ( glyphwell_allowed_mathml_tags() as $tag_name => $attributes ) {
		// Merge with any attributes WordPress already allows for the tag so we
		// extend, rather than overwrite, the existing rules.
		$tags[ $tag_name ] = isset( $tags[ $tag_name ] )
			? array_merge( $tags[ $tag_name ], $attributes )
			: $attributes;
	}

	return $tags;
}

add_filter( 'wp_kses_allowed_html', 'glyphwell_extend_allowed_post_tags', 10, 2 );
