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
	// Size, spacing, color, and line values are further checked by
	// glyphwell_is_safe_mathml_attribute_value().
	$common_attributes = array(
		'class'          => true,
		'displaystyle'   => true,
		'mathbackground' => true,
		'mathcolor'      => true,
		'mathsize'       => true,
		'mathvariant'    => true,
		'scriptlevel'    => true,
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
			'columnlines'   => true,
			'columnspacing' => true,
			'rowalign'      => true,
			'rowlines'      => true,
			'rowspacing'    => true,
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
		'menclose'   => array_merge(
			$common_attributes,
			array(
				'notation' => true,
			)
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
				'depth'   => true,
				'height'  => true,
				'lspace'  => true,
				'voffset' => true,
				'width'   => true,
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
				'depth'     => true,
				'height'    => true,
				'linebreak' => true,
				'width'     => true,
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
 * Checks a MathML length such as `0.2778em`, `-1width`, `3pt`, or `50%`.
 *
 * Magnitudes are capped at KaTeX's `maxSize` of 20em (or its equivalent) so
 * MathML cannot stretch or overlap content further than KaTeX itself allows.
 *
 * @param string $value Attribute value.
 * @return bool True when the value is a bounded length.
 */
function glyphwell_is_safe_mathml_length( string $value ): bool {
	if ( ! preg_match( '/^[+-]?(\d+(?:\.\d+)?|\.\d+)(em|ex|px|pt|%|width|height|depth)?$/i', $value, $matches ) ) {
		return false;
	}

	$limits = array(
		''       => 20,
		'em'     => 20,
		'ex'     => 20,
		'width'  => 20,
		'height' => 20,
		'depth'  => 20,
		'pt'     => 200,
		'px'     => 320,
		'%'      => 100,
	);

	return (float) $matches[1] <= $limits[ strtolower( $matches[2] ?? '' ) ];
}

/**
 * Checks the value of a MathML attribute that KSES allows by name only.
 *
 * @param string $name  Lowercase attribute name.
 * @param string $value Attribute value.
 * @return bool True when the value is safe to output.
 */
function glyphwell_is_safe_mathml_attribute_value( string $name, string $value ): bool {
	$words = preg_split( '/\s+/', trim( $value ), -1, PREG_SPLIT_NO_EMPTY );

	switch ( $name ) {
		case 'depth':
		case 'height':
		case 'linethickness':
		case 'lspace':
		case 'mathsize':
		case 'maxsize':
		case 'minsize':
		case 'rspace':
		case 'voffset':
		case 'width':
			return glyphwell_is_safe_mathml_length( $value );

		case 'columnspacing':
		case 'rowspacing':
			return $words && count( $words ) === count( array_filter( $words, 'glyphwell_is_safe_mathml_length' ) );

		case 'columnlines':
		case 'rowlines':
			return $words && ! array_diff( $words, array( 'none', 'solid', 'dashed' ) );

		case 'notation':
			return $words && ! array_diff(
				$words,
				array( 'actuarial', 'bottom', 'box', 'circle', 'downdiagonalstrike', 'horizontalstrike', 'left', 'longdiv', 'madruwb', 'phasorangle', 'radical', 'right', 'roundedbox', 'top', 'updiagonalarrow', 'updiagonalstrike', 'verticalstrike' )
			);

		case 'linebreak':
			return in_array( $value, array( 'auto', 'newline', 'nobreak', 'goodbreak', 'badbreak' ), true );

		case 'mathbackground':
		case 'mathcolor':
			return 1 === preg_match( '/^(#[0-9a-f]{3,8}|[a-z]+)$/i', $value );
	}

	return true;
}

/**
 * Sanitizes MathML before output.
 *
 * @param string $mathml MathML markup.
 * @return string Sanitized MathML markup.
 */
function glyphwell_sanitize_mathml( string $mathml ): string {
	$mathml = wp_kses( $mathml, glyphwell_allowed_mathml_tags() );

	$sanitized = preg_replace_callback(
		'#<[a-z][^>]*>#i',
		static fn( array $tag ): string => (string) preg_replace_callback(
			'#\s([a-z-]+)=("[^"]*"|\'[^\']*\')#i',
			static fn( array $attr ): string => glyphwell_is_safe_mathml_attribute_value( strtolower( $attr[1] ), substr( $attr[2], 1, -1 ) ) ? $attr[0] : '',
			$tag[0]
		),
		$mathml
	);

	return $sanitized ?? '';
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
