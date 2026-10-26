/**
 * KaTeX options shared by the editor preview, the stored MathML, and the
 * frontend renderer, so all three produce the same output.
 *
 * `trust: false` plus the size/expansion caps guard against malicious or
 * runaway input rendered from saved post content.
 */
export const KATEX_OPTIONS = {
	throwOnError: false,
	output: 'htmlAndMathml',
	trust: false,
	maxSize: 20,
	maxExpand: 1000,
};
