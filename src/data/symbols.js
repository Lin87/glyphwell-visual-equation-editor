import { __ } from '@wordpress/i18n';

/**
 * Builds a palette symbol descriptor.
 *
 * @param {string} id        Unique symbol id (also used as a React key).
 * @param {string} visual    Glyph shown on the button.
 * @param {string} latex     LaTeX inserted when the symbol is chosen.
 * @param {string} ariaLabel Accessible label for the button.
 * @return {{id: string, visual: string, latex: string, ariaLabel: string}} The descriptor.
 */
const symbol = ( id, visual, latex, ariaLabel ) => ( {
	id,
	visual,
	latex,
	ariaLabel,
} );

/**
 * Ordered symbol groups shown in the palette. Each group has an `id`, a `label`
 * for its tab, and a flat, ordered `symbols` list of {@link symbol} descriptors.
 *
 * The list is intentionally layout-agnostic: it captures which symbols belong to
 * a category and their reading order only. How many symbols appear per visual
 * row is decided by CSS (the palette grid wraps to fit the popover width), not
 * by this data.
 *
 * Most groups render a glyph grid from their `symbols` list. A group may
 * instead set `type` to render a custom panel (e.g. `type: 'matrix'`), in which
 * case it carries no `symbols`.
 *
 * @type {Array<{id: string, label: string, type?: string, symbols?: Array<Object>}>}
 */
export const SYMBOL_GROUPS = [
	{
		id: 'basic',
		label: __( 'Basic', 'glyphwell' ),
		symbols: [
			symbol(
				'subscript',
				'x□',
				'x_{#0}',
				__( 'Insert subscript', 'glyphwell' )
			),
			symbol(
				'superscript',
				'x^□',
				'x^{#0}',
				__( 'Insert superscript', 'glyphwell' )
			),
			symbol(
				'fraction',
				'n/m',
				'\\frac{#0}{#1}',
				__( 'Insert fraction', 'glyphwell' )
			),
			symbol(
				'square-root',
				'√',
				'\\sqrt{#0}',
				__( 'Insert square root', 'glyphwell' )
			),
			symbol(
				'nth-root',
				'ⁿ√',
				'\\sqrt[#0]{#1}',
				__( 'Insert nth root', 'glyphwell' )
			),
			symbol(
				'binomial',
				'(ⁿₘ)',
				'\\binom{#0}{#1}',
				__( 'Insert binomial', 'glyphwell' )
			),
			symbol(
				'left-parenthesis',
				'(',
				'(',
				__( 'Insert left parenthesis', 'glyphwell' )
			),
			symbol(
				'right-parenthesis',
				')',
				')',
				__( 'Insert right parenthesis', 'glyphwell' )
			),
			symbol( 'plus', '+', '+', __( 'Insert plus', 'glyphwell' ) ),
			symbol(
				'minus',
				'−',
				'-',
				__( 'Insert minus', 'glyphwell' )
			),
			symbol(
				'times',
				'×',
				'\\times',
				__( 'Insert multiplication sign', 'glyphwell' )
			),
			symbol(
				'division',
				'÷',
				'\\div',
				__( 'Insert division sign', 'glyphwell' )
			),
			symbol(
				'slash',
				'/',
				'/',
				__( 'Insert slash', 'glyphwell' )
			),
			symbol(
				'plus-minus',
				'±',
				'\\pm',
				__( 'Insert plus minus', 'glyphwell' )
			),
			symbol(
				'minus-plus',
				'∓',
				'\\mp',
				__( 'Insert minus plus', 'glyphwell' )
			),
			symbol(
				'equals',
				'=',
				'=',
				__( 'Insert equals', 'glyphwell' )
			),
			symbol(
				'not-equal',
				'≠',
				'\\neq',
				__( 'Insert not equal', 'glyphwell' )
			),
			symbol(
				'less-than',
				'<',
				'<',
				__( 'Insert less than', 'glyphwell' )
			),
			symbol(
				'greater-than',
				'>',
				'>',
				__( 'Insert greater than', 'glyphwell' )
			),
			symbol(
				'less-equal',
				'≤',
				'\\leq',
				__( 'Insert less than or equal to', 'glyphwell' )
			),
			symbol(
				'greater-equal',
				'≥',
				'\\geq',
				__( 'Insert greater than or equal to', 'glyphwell' )
			),
			symbol(
				'asterisk',
				'*',
				'*',
				__( 'Insert asterisk', 'glyphwell' )
			),
			symbol(
				'cdot',
				'⋅',
				'\\cdot',
				__( 'Insert center dot', 'glyphwell' )
			),
			symbol(
				'bullet',
				'•',
				'\\bullet',
				__( 'Insert bullet', 'glyphwell' )
			),
			symbol(
				'bar',
				'x̄',
				'\\bar{#0}',
				__( 'Insert overbar', 'glyphwell' )
			),
			symbol(
				'hat',
				'x̂',
				'\\hat{#0}',
				__( 'Insert hat accent', 'glyphwell' )
			),
			symbol(
				'vector',
				'v⃗',
				'\\vec{#0}',
				__( 'Insert vector accent', 'glyphwell' )
			),
		],
	},
	{
		id: 'greek',
		label: __( 'Greek', 'glyphwell' ),
		symbols: [
			symbol(
				'alpha',
				'α',
				'\\alpha',
				__( 'Insert alpha', 'glyphwell' )
			),
			symbol(
				'beta',
				'β',
				'\\beta',
				__( 'Insert beta', 'glyphwell' )
			),
			symbol(
				'gamma',
				'γ',
				'\\gamma',
				__( 'Insert gamma', 'glyphwell' )
			),
			symbol(
				'delta',
				'δ',
				'\\delta',
				__( 'Insert delta', 'glyphwell' )
			),
			symbol(
				'epsilon',
				'ϵ',
				'\\epsilon',
				__( 'Insert epsilon', 'glyphwell' )
			),
			symbol(
				'zeta',
				'ζ',
				'\\zeta',
				__( 'Insert zeta', 'glyphwell' )
			),
			symbol(
				'eta',
				'η',
				'\\eta',
				__( 'Insert eta', 'glyphwell' )
			),
			symbol(
				'theta',
				'θ',
				'\\theta',
				__( 'Insert theta', 'glyphwell' )
			),
			symbol(
				'iota',
				'ι',
				'\\iota',
				__( 'Insert iota', 'glyphwell' )
			),
			symbol(
				'kappa',
				'κ',
				'\\kappa',
				__( 'Insert kappa', 'glyphwell' )
			),
			symbol(
				'lambda',
				'λ',
				'\\lambda',
				__( 'Insert lambda', 'glyphwell' )
			),
			symbol( 'mu', 'μ', '\\mu', __( 'Insert mu', 'glyphwell' ) ),
			symbol( 'nu', 'ν', '\\nu', __( 'Insert nu', 'glyphwell' ) ),
			symbol( 'xi', 'ξ', '\\xi', __( 'Insert xi', 'glyphwell' ) ),
			symbol( 'pi', 'π', '\\pi', __( 'Insert pi', 'glyphwell' ) ),
			symbol(
				'rho',
				'ρ',
				'\\rho',
				__( 'Insert rho', 'glyphwell' )
			),
			symbol(
				'sigma',
				'σ',
				'\\sigma',
				__( 'Insert sigma', 'glyphwell' )
			),
			symbol(
				'tau',
				'τ',
				'\\tau',
				__( 'Insert tau', 'glyphwell' )
			),
			symbol(
				'upsilon',
				'υ',
				'\\upsilon',
				__( 'Insert upsilon', 'glyphwell' )
			),
			symbol(
				'phi',
				'φ',
				'\\phi',
				__( 'Insert phi', 'glyphwell' )
			),
			symbol(
				'chi',
				'χ',
				'\\chi',
				__( 'Insert chi', 'glyphwell' )
			),
			symbol(
				'psi',
				'ψ',
				'\\psi',
				__( 'Insert psi', 'glyphwell' )
			),
			symbol(
				'omega',
				'ω',
				'\\omega',
				__( 'Insert omega', 'glyphwell' )
			),
			symbol(
				'digamma',
				'Ϝ',
				'\\digamma',
				__( 'Insert digamma', 'glyphwell' )
			),
			symbol(
				'varepsilon',
				'ε',
				'\\varepsilon',
				__( 'Insert varepsilon', 'glyphwell' )
			),
			symbol(
				'vartheta',
				'ϑ',
				'\\vartheta',
				__( 'Insert vartheta', 'glyphwell' )
			),
			symbol(
				'varkappa',
				'ϰ',
				'\\varkappa',
				__( 'Insert varkappa', 'glyphwell' )
			),
			symbol(
				'varpi',
				'ϖ',
				'\\varpi',
				__( 'Insert varpi', 'glyphwell' )
			),
			symbol(
				'varrho',
				'ϱ',
				'\\varrho',
				__( 'Insert varrho', 'glyphwell' )
			),
			symbol(
				'varsigma',
				'ς',
				'\\varsigma',
				__( 'Insert varsigma', 'glyphwell' )
			),
			symbol(
				'varphi',
				'ϕ',
				'\\varphi',
				__( 'Insert varphi', 'glyphwell' )
			),
			symbol(
				'gamma-uppercase',
				'Γ',
				'\\Gamma',
				__( 'Insert uppercase gamma', 'glyphwell' )
			),
			symbol(
				'delta-uppercase',
				'Δ',
				'\\Delta',
				__( 'Insert uppercase delta', 'glyphwell' )
			),
			symbol(
				'theta-uppercase',
				'Θ',
				'\\Theta',
				__( 'Insert uppercase theta', 'glyphwell' )
			),
			symbol(
				'lambda-uppercase',
				'Λ',
				'\\Lambda',
				__( 'Insert uppercase lambda', 'glyphwell' )
			),
			symbol(
				'xi-uppercase',
				'Ξ',
				'\\Xi',
				__( 'Insert uppercase xi', 'glyphwell' )
			),
			symbol(
				'pi-uppercase',
				'Π',
				'\\Pi',
				__( 'Insert uppercase pi', 'glyphwell' )
			),
			symbol(
				'sigma-uppercase',
				'Σ',
				'\\Sigma',
				__( 'Insert uppercase sigma', 'glyphwell' )
			),
			symbol(
				'upsilon-uppercase',
				'Υ',
				'\\Upsilon',
				__( 'Insert uppercase upsilon', 'glyphwell' )
			),
			symbol(
				'phi-uppercase',
				'Φ',
				'\\Phi',
				__( 'Insert uppercase phi', 'glyphwell' )
			),
			symbol(
				'psi-uppercase',
				'Ψ',
				'\\Psi',
				__( 'Insert uppercase psi', 'glyphwell' )
			),
			symbol(
				'omega-uppercase',
				'Ω',
				'\\Omega',
				__( 'Insert uppercase omega', 'glyphwell' )
			),
		],
	},
	{
		id: 'operators',
		label: __( 'Operators', 'glyphwell' ),
		symbols: [
			symbol(
				'wedge',
				'∧',
				'\\wedge',
				__( 'Insert wedge', 'glyphwell' )
			),
			symbol(
				'vee',
				'∨',
				'\\vee',
				__( 'Insert vee', 'glyphwell' )
			),
			symbol(
				'cup',
				'∪',
				'\\cup',
				__( 'Insert union', 'glyphwell' )
			),
			symbol(
				'cap',
				'∩',
				'\\cap',
				__( 'Insert intersection', 'glyphwell' )
			),
			symbol(
				'uplus',
				'⊎',
				'\\uplus',
				__( 'Insert multiset union', 'glyphwell' )
			),
			symbol(
				'sqcap',
				'⊓',
				'\\sqcap',
				__( 'Insert square cap', 'glyphwell' )
			),
			symbol(
				'sqcup',
				'⊔',
				'\\sqcup',
				__( 'Insert square cup', 'glyphwell' )
			),
			symbol(
				'oplus',
				'⊕',
				'\\oplus',
				__( 'Insert direct sum', 'glyphwell' )
			),
			symbol(
				'ominus',
				'⊖',
				'\\ominus',
				__( 'Insert circled minus', 'glyphwell' )
			),
			symbol(
				'otimes',
				'⊗',
				'\\otimes',
				__( 'Insert tensor product', 'glyphwell' )
			),
			symbol(
				'odot',
				'⊙',
				'\\odot',
				__( 'Insert circled dot', 'glyphwell' )
			),
			symbol(
				'circ',
				'○',
				'\\circ',
				__( 'Insert circle operator', 'glyphwell' )
			),
			symbol(
				'diamond',
				'◇',
				'\\diamond',
				__( 'Insert diamond', 'glyphwell' )
			),
			symbol(
				'triangle',
				'△',
				'\\triangle',
				__( 'Insert triangle', 'glyphwell' )
			),
			symbol(
				'triangledown',
				'▽',
				'\\triangledown',
				__( 'Insert down triangle', 'glyphwell' )
			),
			symbol(
				'triangleleft',
				'◁',
				'\\triangleleft',
				__( 'Insert left triangle', 'glyphwell' )
			),
			symbol(
				'triangleright',
				'▷',
				'\\triangleright',
				__( 'Insert right triangle', 'glyphwell' )
			),
			symbol(
				'dagger',
				'†',
				'\\dagger',
				__( 'Insert dagger', 'glyphwell' )
			),
			symbol(
				'ddagger',
				'‡',
				'\\ddagger',
				__( 'Insert double dagger', 'glyphwell' )
			),
			symbol(
				'amalg',
				'⨿',
				'\\amalg',
				__( 'Insert amalgamation symbol', 'glyphwell' )
			),
			symbol(
				'setminus',
				'\\',
				'\\setminus',
				__( 'Insert set minus', 'glyphwell' )
			),
			symbol(
				'partial',
				'∂',
				'\\partial',
				__( 'Insert partial derivative', 'glyphwell' )
			),
			symbol(
				'nabla',
				'∇',
				'\\nabla',
				__( 'Insert nabla', 'glyphwell' )
			),
			symbol(
				'integral',
				'∫',
				'\\int',
				__( 'Insert integral', 'glyphwell' )
			),
			symbol(
				'definite-integral',
				'∫ₐᵇ',
				'\\int_{#0}^{#1}',
				__( 'Insert definite integral', 'glyphwell' )
			),
			symbol(
				'oint',
				'∮',
				'\\oint',
				__( 'Insert contour integral', 'glyphwell' )
			),
			symbol(
				'sum',
				'∑',
				'\\sum',
				__( 'Insert summation', 'glyphwell' )
			),
			symbol(
				'product',
				'∏',
				'\\prod',
				__( 'Insert product', 'glyphwell' )
			),
			symbol(
				'coproduct',
				'∐',
				'\\coprod',
				__( 'Insert coproduct', 'glyphwell' )
			),
			symbol(
				'lim',
				'lim',
				'\\lim',
				__( 'Insert limit', 'glyphwell' )
			),
			symbol(
				'infty',
				'∞',
				'\\infty',
				__( 'Insert infinity', 'glyphwell' )
			),
		],
	},
	{
		id: 'relations',
		label: __( 'Relations & Sets', 'glyphwell' ),
		symbols: [
			symbol(
				'equiv',
				'≡',
				'\\equiv',
				__( 'Insert equivalent to', 'glyphwell' )
			),
			symbol(
				'cong',
				'≅',
				'\\cong',
				__( 'Insert congruent to', 'glyphwell' )
			),
			symbol(
				'not-cong',
				'≇',
				'\\ncong',
				__( 'Insert not congruent to', 'glyphwell' )
			),
			symbol(
				'sim',
				'∼',
				'\\sim',
				__( 'Insert similar to', 'glyphwell' )
			),
			symbol(
				'simeq',
				'≃',
				'\\simeq',
				__( 'Insert asymptotically equal', 'glyphwell' )
			),
			symbol(
				'approx',
				'≈',
				'\\approx',
				__( 'Insert approximately equal', 'glyphwell' )
			),
			symbol(
				'propto',
				'∝',
				'\\propto',
				__( 'Insert proportional to', 'glyphwell' )
			),
			symbol(
				'doteq',
				'≐',
				'\\doteq',
				__( 'Insert dotted equals', 'glyphwell' )
			),
			symbol(
				'prec',
				'≺',
				'\\prec',
				__( 'Insert precedes', 'glyphwell' )
			),
			symbol(
				'succ',
				'≻',
				'\\succ',
				__( 'Insert succeeds', 'glyphwell' )
			),
			symbol(
				'preceq',
				'≼',
				'\\preceq',
				__( 'Insert precedes or equal', 'glyphwell' )
			),
			symbol(
				'succeq',
				'≽',
				'\\succeq',
				__( 'Insert succeeds or equal', 'glyphwell' )
			),
			symbol(
				'll',
				'≪',
				'\\ll',
				__( 'Insert much less than', 'glyphwell' )
			),
			symbol(
				'gg',
				'≫',
				'\\gg',
				__( 'Insert much greater than', 'glyphwell' )
			),
			symbol(
				'models',
				'⊨',
				'\\models',
				__( 'Insert models', 'glyphwell' )
			),
			symbol(
				'vdash',
				'⊢',
				'\\vdash',
				__( 'Insert turnstile', 'glyphwell' )
			),
			symbol(
				'dashv',
				'⊣',
				'\\dashv',
				__( 'Insert reverse turnstile', 'glyphwell' )
			),
			symbol(
				'mid',
				'|',
				'\\mid',
				__( 'Insert divides', 'glyphwell' )
			),
			symbol(
				'parallel',
				'∥',
				'\\parallel',
				__( 'Insert parallel', 'glyphwell' )
			),
			symbol(
				'perp',
				'⊥',
				'\\perp',
				__( 'Insert perpendicular', 'glyphwell' )
			),
			symbol(
				'bowtie',
				'⋈',
				'\\bowtie',
				__( 'Insert bowtie', 'glyphwell' )
			),
			symbol(
				'smile',
				'⌣',
				'\\smile',
				__( 'Insert smile', 'glyphwell' )
			),
			symbol(
				'frown',
				'⌢',
				'\\frown',
				__( 'Insert frown', 'glyphwell' )
			),
			symbol(
				'sqsubset',
				'⊏',
				'\\sqsubset',
				__( 'Insert square subset', 'glyphwell' )
			),
			symbol(
				'sqsupset',
				'⊐',
				'\\sqsupset',
				__( 'Insert square superset', 'glyphwell' )
			),
			symbol(
				'sqsubseteq',
				'⊑',
				'\\sqsubseteq',
				__( 'Insert square subset or equal', 'glyphwell' )
			),
			symbol(
				'sqsupseteq',
				'⊒',
				'\\sqsupseteq',
				__( 'Insert square superset or equal', 'glyphwell' )
			),
			symbol(
				'natural-numbers',
				'ℕ',
				'\\mathbb{N}',
				__( 'Insert natural numbers', 'glyphwell' )
			),
			symbol(
				'integers',
				'ℤ',
				'\\mathbb{Z}',
				__( 'Insert integers', 'glyphwell' )
			),
			symbol(
				'rationals',
				'ℚ',
				'\\mathbb{Q}',
				__( 'Insert rational numbers', 'glyphwell' )
			),
			symbol(
				'reals',
				'ℝ',
				'\\mathbb{R}',
				__( 'Insert real numbers', 'glyphwell' )
			),
			symbol(
				'complex',
				'ℂ',
				'\\mathbb{C}',
				__( 'Insert complex numbers', 'glyphwell' )
			),
			symbol(
				'quaternions',
				'ℍ',
				'\\mathbb{H}',
				__( 'Insert quaternions', 'glyphwell' )
			),
			symbol(
				'projective-space',
				'ℙ',
				'\\mathbb{P}',
				__( 'Insert projective space', 'glyphwell' )
			),
			symbol(
				'emptyset',
				'∅',
				'\\emptyset',
				__( 'Insert empty set', 'glyphwell' )
			),
			symbol(
				'in',
				'∈',
				'\\in',
				__( 'Insert element of', 'glyphwell' )
			),
			symbol(
				'not-in',
				'∉',
				'\\notin',
				__( 'Insert not element of', 'glyphwell' )
			),
			symbol(
				'ni',
				'∋',
				'\\ni',
				__( 'Insert contains as member', 'glyphwell' )
			),
			symbol(
				'not-ni',
				'∌',
				'\\not\\ni',
				__( 'Insert does not contain as member', 'glyphwell' )
			),
			symbol(
				'subset',
				'⊂',
				'\\subset',
				__( 'Insert subset', 'glyphwell' )
			),
			symbol(
				'supset',
				'⊃',
				'\\supset',
				__( 'Insert superset', 'glyphwell' )
			),
			symbol(
				'subseteq',
				'⊆',
				'\\subseteq',
				__( 'Insert subset or equal', 'glyphwell' )
			),
			symbol(
				'supseteq',
				'⊇',
				'\\supseteq',
				__( 'Insert superset or equal', 'glyphwell' )
			),
			symbol(
				'not-subset',
				'⊄',
				'\\not\\subset',
				__( 'Insert not subset', 'glyphwell' )
			),
			symbol(
				'not-supset',
				'⊅',
				'\\not\\supset',
				__( 'Insert not superset', 'glyphwell' )
			),
			symbol(
				'forall',
				'∀',
				'\\forall',
				__( 'Insert for all', 'glyphwell' )
			),
			symbol(
				'exists',
				'∃',
				'\\exists',
				__( 'Insert exists', 'glyphwell' )
			),
			symbol(
				'neg',
				'¬',
				'\\neg',
				__( 'Insert negation', 'glyphwell' )
			),
			symbol(
				'therefore',
				'∴',
				'\\therefore',
				__( 'Insert therefore', 'glyphwell' )
			),
			symbol(
				'because',
				'∵',
				'\\because',
				__( 'Insert because', 'glyphwell' )
			),
		],
	},
	{
		id: 'arrows',
		label: __( 'Arrows', 'glyphwell' ),
		symbols: [
			symbol(
				'leftarrow',
				'←',
				'\\leftarrow',
				__( 'Insert left arrow', 'glyphwell' )
			),
			symbol(
				'rightarrow',
				'→',
				'\\rightarrow',
				__( 'Insert right arrow', 'glyphwell' )
			),
			symbol(
				'Leftarrow',
				'⇐',
				'\\Leftarrow',
				__( 'Insert double left arrow', 'glyphwell' )
			),
			symbol(
				'Rightarrow',
				'⇒',
				'\\Rightarrow',
				__( 'Insert double right arrow', 'glyphwell' )
			),
			symbol(
				'leftrightarrow',
				'↔',
				'\\leftrightarrow',
				__( 'Insert left right arrow', 'glyphwell' )
			),
			symbol(
				'Leftrightarrow',
				'⇔',
				'\\Leftrightarrow',
				__( 'Insert if and only if', 'glyphwell' )
			),
			symbol(
				'uparrow',
				'↑',
				'\\uparrow',
				__( 'Insert up arrow', 'glyphwell' )
			),
			symbol(
				'downarrow',
				'↓',
				'\\downarrow',
				__( 'Insert down arrow', 'glyphwell' )
			),
			symbol(
				'Uparrow',
				'⇑',
				'\\Uparrow',
				__( 'Insert double up arrow', 'glyphwell' )
			),
			symbol(
				'Downarrow',
				'⇓',
				'\\Downarrow',
				__( 'Insert double down arrow', 'glyphwell' )
			),
			symbol(
				'updownarrow',
				'↕',
				'\\updownarrow',
				__( 'Insert up down arrow', 'glyphwell' )
			),
			symbol(
				'Updownarrow',
				'⇕',
				'\\Updownarrow',
				__( 'Insert double up down arrow', 'glyphwell' )
			),
			symbol(
				'longleftrightarrow',
				'⟷',
				'\\longleftrightarrow',
				__( 'Insert long left right arrow', 'glyphwell' )
			),
			symbol(
				'mapsto',
				'↦',
				'\\mapsto',
				__( 'Insert maps to', 'glyphwell' )
			),
			symbol(
				'hookleftarrow',
				'↩',
				'\\hookleftarrow',
				__( 'Insert hooked left arrow', 'glyphwell' )
			),
			symbol(
				'hookrightarrow',
				'↪',
				'\\hookrightarrow',
				__( 'Insert hooked right arrow', 'glyphwell' )
			),
			symbol(
				'rightleftarrows',
				'⇄',
				'\\rightleftarrows',
				__( 'Insert opposing arrows', 'glyphwell' )
			),
			symbol(
				'nearrow',
				'↗',
				'\\nearrow',
				__( 'Insert northeast arrow', 'glyphwell' )
			),
			symbol(
				'searrow',
				'↘',
				'\\searrow',
				__( 'Insert southeast arrow', 'glyphwell' )
			),
			symbol(
				'swarrow',
				'↙',
				'\\swarrow',
				__( 'Insert southwest arrow', 'glyphwell' )
			),
			symbol(
				'nwarrow',
				'↖',
				'\\nwarrow',
				__( 'Insert northwest arrow', 'glyphwell' )
			),
			symbol(
				'leftharpoonup',
				'↼',
				'\\leftharpoonup',
				__( 'Insert left harpoon up', 'glyphwell' )
			),
			symbol(
				'rightharpoonup',
				'⇀',
				'\\rightharpoonup',
				__( 'Insert right harpoon up', 'glyphwell' )
			),
			symbol(
				'leftharpoondown',
				'↽',
				'\\leftharpoondown',
				__( 'Insert left harpoon down', 'glyphwell' )
			),
			symbol(
				'rightharpoondown',
				'⇁',
				'\\rightharpoondown',
				__( 'Insert right harpoon down', 'glyphwell' )
			),
		],
	},
	{
		id: 'symbols',
		label: __( 'Symbols', 'glyphwell' ),
		symbols: [
			symbol(
				'left-bracket',
				'[',
				'[',
				__( 'Insert left bracket', 'glyphwell' )
			),
			symbol(
				'right-bracket',
				']',
				']',
				__( 'Insert right bracket', 'glyphwell' )
			),
			symbol(
				'left-brace',
				'{',
				'\\{',
				__( 'Insert left brace', 'glyphwell' )
			),
			symbol(
				'right-brace',
				'}',
				'\\}',
				__( 'Insert right brace', 'glyphwell' )
			),
			symbol(
				'lfloor',
				'⌊',
				'\\lfloor',
				__( 'Insert left floor', 'glyphwell' )
			),
			symbol(
				'rfloor',
				'⌋',
				'\\rfloor',
				__( 'Insert right floor', 'glyphwell' )
			),
			symbol(
				'lceil',
				'⌈',
				'\\lceil',
				__( 'Insert left ceiling', 'glyphwell' )
			),
			symbol(
				'rceil',
				'⌉',
				'\\rceil',
				__( 'Insert right ceiling', 'glyphwell' )
			),
			symbol(
				'langle',
				'⟨',
				'\\langle',
				__( 'Insert left angle bracket', 'glyphwell' )
			),
			symbol(
				'rangle',
				'⟩',
				'\\rangle',
				__( 'Insert right angle bracket', 'glyphwell' )
			),
			symbol(
				'vertical-bar',
				'|',
				'|',
				__( 'Insert vertical bar', 'glyphwell' )
			),
			symbol(
				'Vert',
				'‖',
				'\\|',
				__( 'Insert double vertical bar', 'glyphwell' )
			),
			symbol(
				'backslash',
				'\\',
				'\\backslash',
				__( 'Insert backslash', 'glyphwell' )
			),
			symbol(
				'ell',
				'ℓ',
				'\\ell',
				__( 'Insert script ell', 'glyphwell' )
			),
			symbol(
				'hbar',
				'ℏ',
				'\\hbar',
				__( 'Insert h-bar', 'glyphwell' )
			),
			symbol(
				'wp',
				'℘',
				'\\wp',
				__( 'Insert Weierstrass p', 'glyphwell' )
			),
			symbol(
				'real-part',
				'ℜ',
				'\\Re',
				__( 'Insert real part', 'glyphwell' )
			),
			symbol(
				'imaginary-part',
				'ℑ',
				'\\Im',
				__( 'Insert imaginary part', 'glyphwell' )
			),
			symbol(
				'aleph',
				'ℵ',
				'\\aleph',
				__( 'Insert aleph', 'glyphwell' )
			),
			symbol(
				'degree',
				'°',
				'^\\circ',
				__( 'Insert degree', 'glyphwell' )
			),
			symbol(
				'angle',
				'∠',
				'\\angle',
				__( 'Insert angle', 'glyphwell' )
			),
			symbol(
				'top',
				'⊤',
				'\\top',
				__( 'Insert top', 'glyphwell' )
			),
			symbol(
				'flat',
				'♭',
				'\\flat',
				__( 'Insert flat', 'glyphwell' )
			),
			symbol(
				'natural',
				'♮',
				'\\natural',
				__( 'Insert natural', 'glyphwell' )
			),
			symbol(
				'sharp',
				'♯',
				'\\sharp',
				__( 'Insert sharp', 'glyphwell' )
			),
			symbol(
				'clubsuit',
				'♣',
				'\\clubsuit',
				__( 'Insert club suit', 'glyphwell' )
			),
			symbol(
				'diamondsuit',
				'♢',
				'\\diamondsuit',
				__( 'Insert diamond suit', 'glyphwell' )
			),
			symbol(
				'heartsuit',
				'♡',
				'\\heartsuit',
				__( 'Insert heart suit', 'glyphwell' )
			),
			symbol(
				'spadesuit',
				'♠',
				'\\spadesuit',
				__( 'Insert spade suit', 'glyphwell' )
			),
			symbol(
				'ldots',
				'…',
				'\\ldots',
				__( 'Insert ellipsis', 'glyphwell' )
			),
			symbol(
				'cdots',
				'⋯',
				'\\cdots',
				__( 'Insert centered ellipsis', 'glyphwell' )
			),
			symbol(
				'vdots',
				'⋮',
				'\\vdots',
				__( 'Insert vertical ellipsis', 'glyphwell' )
			),
			symbol(
				'ddots',
				'⋱',
				'\\ddots',
				__( 'Insert diagonal ellipsis', 'glyphwell' )
			),
		],
	},
	{
		// The Matrix tab renders a custom panel (matrix size grid, border and
		// row/column controls) instead of a flat glyph grid, so it carries a
		// `type` and no `symbols` list. See MatrixPanel and src/data/matrix.js.
		id: 'matrix',
		label: __( 'Matrix', 'glyphwell' ),
		type: 'matrix',
	},
];
