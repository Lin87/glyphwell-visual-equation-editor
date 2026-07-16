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
		label: __( 'Basic', 'equation-editor' ),
		symbols: [
			symbol(
				'subscript',
				'x□',
				'x_{#0}',
				__( 'Insert subscript', 'equation-editor' )
			),
			symbol(
				'superscript',
				'x^□',
				'x^{#0}',
				__( 'Insert superscript', 'equation-editor' )
			),
			symbol(
				'fraction',
				'n/m',
				'\\frac{#0}{#1}',
				__( 'Insert fraction', 'equation-editor' )
			),
			symbol(
				'square-root',
				'√',
				'\\sqrt{#0}',
				__( 'Insert square root', 'equation-editor' )
			),
			symbol(
				'nth-root',
				'ⁿ√',
				'\\sqrt[#0]{#1}',
				__( 'Insert nth root', 'equation-editor' )
			),
			symbol(
				'binomial',
				'(ⁿₘ)',
				'\\binom{#0}{#1}',
				__( 'Insert binomial', 'equation-editor' )
			),
			symbol(
				'left-parenthesis',
				'(',
				'(',
				__( 'Insert left parenthesis', 'equation-editor' )
			),
			symbol(
				'right-parenthesis',
				')',
				')',
				__( 'Insert right parenthesis', 'equation-editor' )
			),
			symbol( 'plus', '+', '+', __( 'Insert plus', 'equation-editor' ) ),
			symbol(
				'minus',
				'−',
				'-',
				__( 'Insert minus', 'equation-editor' )
			),
			symbol(
				'times',
				'×',
				'\\times',
				__( 'Insert multiplication sign', 'equation-editor' )
			),
			symbol(
				'division',
				'÷',
				'\\div',
				__( 'Insert division sign', 'equation-editor' )
			),
			symbol(
				'slash',
				'/',
				'/',
				__( 'Insert slash', 'equation-editor' )
			),
			symbol(
				'plus-minus',
				'±',
				'\\pm',
				__( 'Insert plus minus', 'equation-editor' )
			),
			symbol(
				'minus-plus',
				'∓',
				'\\mp',
				__( 'Insert minus plus', 'equation-editor' )
			),
			symbol(
				'equals',
				'=',
				'=',
				__( 'Insert equals', 'equation-editor' )
			),
			symbol(
				'not-equal',
				'≠',
				'\\neq',
				__( 'Insert not equal', 'equation-editor' )
			),
			symbol(
				'less-than',
				'<',
				'<',
				__( 'Insert less than', 'equation-editor' )
			),
			symbol(
				'greater-than',
				'>',
				'>',
				__( 'Insert greater than', 'equation-editor' )
			),
			symbol(
				'less-equal',
				'≤',
				'\\leq',
				__( 'Insert less than or equal to', 'equation-editor' )
			),
			symbol(
				'greater-equal',
				'≥',
				'\\geq',
				__( 'Insert greater than or equal to', 'equation-editor' )
			),
			symbol(
				'asterisk',
				'*',
				'*',
				__( 'Insert asterisk', 'equation-editor' )
			),
			symbol(
				'cdot',
				'⋅',
				'\\cdot',
				__( 'Insert center dot', 'equation-editor' )
			),
			symbol(
				'bullet',
				'•',
				'\\bullet',
				__( 'Insert bullet', 'equation-editor' )
			),
			symbol(
				'bar',
				'x̄',
				'\\bar{#0}',
				__( 'Insert overbar', 'equation-editor' )
			),
			symbol(
				'hat',
				'x̂',
				'\\hat{#0}',
				__( 'Insert hat accent', 'equation-editor' )
			),
			symbol(
				'vector',
				'v⃗',
				'\\vec{#0}',
				__( 'Insert vector accent', 'equation-editor' )
			),
		],
	},
	{
		id: 'greek',
		label: __( 'Greek', 'equation-editor' ),
		symbols: [
			symbol(
				'alpha',
				'α',
				'\\alpha',
				__( 'Insert alpha', 'equation-editor' )
			),
			symbol(
				'beta',
				'β',
				'\\beta',
				__( 'Insert beta', 'equation-editor' )
			),
			symbol(
				'gamma',
				'γ',
				'\\gamma',
				__( 'Insert gamma', 'equation-editor' )
			),
			symbol(
				'delta',
				'δ',
				'\\delta',
				__( 'Insert delta', 'equation-editor' )
			),
			symbol(
				'epsilon',
				'ϵ',
				'\\epsilon',
				__( 'Insert epsilon', 'equation-editor' )
			),
			symbol(
				'zeta',
				'ζ',
				'\\zeta',
				__( 'Insert zeta', 'equation-editor' )
			),
			symbol(
				'eta',
				'η',
				'\\eta',
				__( 'Insert eta', 'equation-editor' )
			),
			symbol(
				'theta',
				'θ',
				'\\theta',
				__( 'Insert theta', 'equation-editor' )
			),
			symbol(
				'iota',
				'ι',
				'\\iota',
				__( 'Insert iota', 'equation-editor' )
			),
			symbol(
				'kappa',
				'κ',
				'\\kappa',
				__( 'Insert kappa', 'equation-editor' )
			),
			symbol(
				'lambda',
				'λ',
				'\\lambda',
				__( 'Insert lambda', 'equation-editor' )
			),
			symbol( 'mu', 'μ', '\\mu', __( 'Insert mu', 'equation-editor' ) ),
			symbol( 'nu', 'ν', '\\nu', __( 'Insert nu', 'equation-editor' ) ),
			symbol( 'xi', 'ξ', '\\xi', __( 'Insert xi', 'equation-editor' ) ),
			symbol( 'pi', 'π', '\\pi', __( 'Insert pi', 'equation-editor' ) ),
			symbol(
				'rho',
				'ρ',
				'\\rho',
				__( 'Insert rho', 'equation-editor' )
			),
			symbol(
				'sigma',
				'σ',
				'\\sigma',
				__( 'Insert sigma', 'equation-editor' )
			),
			symbol(
				'tau',
				'τ',
				'\\tau',
				__( 'Insert tau', 'equation-editor' )
			),
			symbol(
				'upsilon',
				'υ',
				'\\upsilon',
				__( 'Insert upsilon', 'equation-editor' )
			),
			symbol(
				'phi',
				'φ',
				'\\phi',
				__( 'Insert phi', 'equation-editor' )
			),
			symbol(
				'chi',
				'χ',
				'\\chi',
				__( 'Insert chi', 'equation-editor' )
			),
			symbol(
				'psi',
				'ψ',
				'\\psi',
				__( 'Insert psi', 'equation-editor' )
			),
			symbol(
				'omega',
				'ω',
				'\\omega',
				__( 'Insert omega', 'equation-editor' )
			),
			symbol(
				'digamma',
				'Ϝ',
				'\\digamma',
				__( 'Insert digamma', 'equation-editor' )
			),
			symbol(
				'varepsilon',
				'ε',
				'\\varepsilon',
				__( 'Insert varepsilon', 'equation-editor' )
			),
			symbol(
				'vartheta',
				'ϑ',
				'\\vartheta',
				__( 'Insert vartheta', 'equation-editor' )
			),
			symbol(
				'varkappa',
				'ϰ',
				'\\varkappa',
				__( 'Insert varkappa', 'equation-editor' )
			),
			symbol(
				'varpi',
				'ϖ',
				'\\varpi',
				__( 'Insert varpi', 'equation-editor' )
			),
			symbol(
				'varrho',
				'ϱ',
				'\\varrho',
				__( 'Insert varrho', 'equation-editor' )
			),
			symbol(
				'varsigma',
				'ς',
				'\\varsigma',
				__( 'Insert varsigma', 'equation-editor' )
			),
			symbol(
				'varphi',
				'ϕ',
				'\\varphi',
				__( 'Insert varphi', 'equation-editor' )
			),
			symbol(
				'gamma-uppercase',
				'Γ',
				'\\Gamma',
				__( 'Insert uppercase gamma', 'equation-editor' )
			),
			symbol(
				'delta-uppercase',
				'Δ',
				'\\Delta',
				__( 'Insert uppercase delta', 'equation-editor' )
			),
			symbol(
				'theta-uppercase',
				'Θ',
				'\\Theta',
				__( 'Insert uppercase theta', 'equation-editor' )
			),
			symbol(
				'lambda-uppercase',
				'Λ',
				'\\Lambda',
				__( 'Insert uppercase lambda', 'equation-editor' )
			),
			symbol(
				'xi-uppercase',
				'Ξ',
				'\\Xi',
				__( 'Insert uppercase xi', 'equation-editor' )
			),
			symbol(
				'pi-uppercase',
				'Π',
				'\\Pi',
				__( 'Insert uppercase pi', 'equation-editor' )
			),
			symbol(
				'sigma-uppercase',
				'Σ',
				'\\Sigma',
				__( 'Insert uppercase sigma', 'equation-editor' )
			),
			symbol(
				'upsilon-uppercase',
				'Υ',
				'\\Upsilon',
				__( 'Insert uppercase upsilon', 'equation-editor' )
			),
			symbol(
				'phi-uppercase',
				'Φ',
				'\\Phi',
				__( 'Insert uppercase phi', 'equation-editor' )
			),
			symbol(
				'psi-uppercase',
				'Ψ',
				'\\Psi',
				__( 'Insert uppercase psi', 'equation-editor' )
			),
			symbol(
				'omega-uppercase',
				'Ω',
				'\\Omega',
				__( 'Insert uppercase omega', 'equation-editor' )
			),
		],
	},
	{
		id: 'operators',
		label: __( 'Operators', 'equation-editor' ),
		symbols: [
			symbol(
				'wedge',
				'∧',
				'\\wedge',
				__( 'Insert wedge', 'equation-editor' )
			),
			symbol(
				'vee',
				'∨',
				'\\vee',
				__( 'Insert vee', 'equation-editor' )
			),
			symbol(
				'cup',
				'∪',
				'\\cup',
				__( 'Insert union', 'equation-editor' )
			),
			symbol(
				'cap',
				'∩',
				'\\cap',
				__( 'Insert intersection', 'equation-editor' )
			),
			symbol(
				'uplus',
				'⊎',
				'\\uplus',
				__( 'Insert multiset union', 'equation-editor' )
			),
			symbol(
				'sqcap',
				'⊓',
				'\\sqcap',
				__( 'Insert square cap', 'equation-editor' )
			),
			symbol(
				'sqcup',
				'⊔',
				'\\sqcup',
				__( 'Insert square cup', 'equation-editor' )
			),
			symbol(
				'oplus',
				'⊕',
				'\\oplus',
				__( 'Insert direct sum', 'equation-editor' )
			),
			symbol(
				'ominus',
				'⊖',
				'\\ominus',
				__( 'Insert circled minus', 'equation-editor' )
			),
			symbol(
				'otimes',
				'⊗',
				'\\otimes',
				__( 'Insert tensor product', 'equation-editor' )
			),
			symbol(
				'odot',
				'⊙',
				'\\odot',
				__( 'Insert circled dot', 'equation-editor' )
			),
			symbol(
				'circ',
				'○',
				'\\circ',
				__( 'Insert circle operator', 'equation-editor' )
			),
			symbol(
				'diamond',
				'◇',
				'\\diamond',
				__( 'Insert diamond', 'equation-editor' )
			),
			symbol(
				'triangle',
				'△',
				'\\triangle',
				__( 'Insert triangle', 'equation-editor' )
			),
			symbol(
				'triangledown',
				'▽',
				'\\triangledown',
				__( 'Insert down triangle', 'equation-editor' )
			),
			symbol(
				'triangleleft',
				'◁',
				'\\triangleleft',
				__( 'Insert left triangle', 'equation-editor' )
			),
			symbol(
				'triangleright',
				'▷',
				'\\triangleright',
				__( 'Insert right triangle', 'equation-editor' )
			),
			symbol(
				'dagger',
				'†',
				'\\dagger',
				__( 'Insert dagger', 'equation-editor' )
			),
			symbol(
				'ddagger',
				'‡',
				'\\ddagger',
				__( 'Insert double dagger', 'equation-editor' )
			),
			symbol(
				'amalg',
				'⨿',
				'\\amalg',
				__( 'Insert amalgamation symbol', 'equation-editor' )
			),
			symbol(
				'setminus',
				'\\',
				'\\setminus',
				__( 'Insert set minus', 'equation-editor' )
			),
			symbol(
				'partial',
				'∂',
				'\\partial',
				__( 'Insert partial derivative', 'equation-editor' )
			),
			symbol(
				'nabla',
				'∇',
				'\\nabla',
				__( 'Insert nabla', 'equation-editor' )
			),
			symbol(
				'integral',
				'∫',
				'\\int',
				__( 'Insert integral', 'equation-editor' )
			),
			symbol(
				'definite-integral',
				'∫ₐᵇ',
				'\\int_{#0}^{#1}',
				__( 'Insert definite integral', 'equation-editor' )
			),
			symbol(
				'oint',
				'∮',
				'\\oint',
				__( 'Insert contour integral', 'equation-editor' )
			),
			symbol(
				'sum',
				'∑',
				'\\sum',
				__( 'Insert summation', 'equation-editor' )
			),
			symbol(
				'product',
				'∏',
				'\\prod',
				__( 'Insert product', 'equation-editor' )
			),
			symbol(
				'coproduct',
				'∐',
				'\\coprod',
				__( 'Insert coproduct', 'equation-editor' )
			),
			symbol(
				'lim',
				'lim',
				'\\lim',
				__( 'Insert limit', 'equation-editor' )
			),
			symbol(
				'infty',
				'∞',
				'\\infty',
				__( 'Insert infinity', 'equation-editor' )
			),
		],
	},
	{
		id: 'relations',
		label: __( 'Relations & Sets', 'equation-editor' ),
		symbols: [
			symbol(
				'equiv',
				'≡',
				'\\equiv',
				__( 'Insert equivalent to', 'equation-editor' )
			),
			symbol(
				'cong',
				'≅',
				'\\cong',
				__( 'Insert congruent to', 'equation-editor' )
			),
			symbol(
				'not-cong',
				'≇',
				'\\ncong',
				__( 'Insert not congruent to', 'equation-editor' )
			),
			symbol(
				'sim',
				'∼',
				'\\sim',
				__( 'Insert similar to', 'equation-editor' )
			),
			symbol(
				'simeq',
				'≃',
				'\\simeq',
				__( 'Insert asymptotically equal', 'equation-editor' )
			),
			symbol(
				'approx',
				'≈',
				'\\approx',
				__( 'Insert approximately equal', 'equation-editor' )
			),
			symbol(
				'propto',
				'∝',
				'\\propto',
				__( 'Insert proportional to', 'equation-editor' )
			),
			symbol(
				'doteq',
				'≐',
				'\\doteq',
				__( 'Insert dotted equals', 'equation-editor' )
			),
			symbol(
				'prec',
				'≺',
				'\\prec',
				__( 'Insert precedes', 'equation-editor' )
			),
			symbol(
				'succ',
				'≻',
				'\\succ',
				__( 'Insert succeeds', 'equation-editor' )
			),
			symbol(
				'preceq',
				'≼',
				'\\preceq',
				__( 'Insert precedes or equal', 'equation-editor' )
			),
			symbol(
				'succeq',
				'≽',
				'\\succeq',
				__( 'Insert succeeds or equal', 'equation-editor' )
			),
			symbol(
				'll',
				'≪',
				'\\ll',
				__( 'Insert much less than', 'equation-editor' )
			),
			symbol(
				'gg',
				'≫',
				'\\gg',
				__( 'Insert much greater than', 'equation-editor' )
			),
			symbol(
				'models',
				'⊨',
				'\\models',
				__( 'Insert models', 'equation-editor' )
			),
			symbol(
				'vdash',
				'⊢',
				'\\vdash',
				__( 'Insert turnstile', 'equation-editor' )
			),
			symbol(
				'dashv',
				'⊣',
				'\\dashv',
				__( 'Insert reverse turnstile', 'equation-editor' )
			),
			symbol(
				'mid',
				'|',
				'\\mid',
				__( 'Insert divides', 'equation-editor' )
			),
			symbol(
				'parallel',
				'∥',
				'\\parallel',
				__( 'Insert parallel', 'equation-editor' )
			),
			symbol(
				'perp',
				'⊥',
				'\\perp',
				__( 'Insert perpendicular', 'equation-editor' )
			),
			symbol(
				'bowtie',
				'⋈',
				'\\bowtie',
				__( 'Insert bowtie', 'equation-editor' )
			),
			symbol(
				'smile',
				'⌣',
				'\\smile',
				__( 'Insert smile', 'equation-editor' )
			),
			symbol(
				'frown',
				'⌢',
				'\\frown',
				__( 'Insert frown', 'equation-editor' )
			),
			symbol(
				'sqsubset',
				'⊏',
				'\\sqsubset',
				__( 'Insert square subset', 'equation-editor' )
			),
			symbol(
				'sqsupset',
				'⊐',
				'\\sqsupset',
				__( 'Insert square superset', 'equation-editor' )
			),
			symbol(
				'sqsubseteq',
				'⊑',
				'\\sqsubseteq',
				__( 'Insert square subset or equal', 'equation-editor' )
			),
			symbol(
				'sqsupseteq',
				'⊒',
				'\\sqsupseteq',
				__( 'Insert square superset or equal', 'equation-editor' )
			),
			symbol(
				'natural-numbers',
				'ℕ',
				'\\mathbb{N}',
				__( 'Insert natural numbers', 'equation-editor' )
			),
			symbol(
				'integers',
				'ℤ',
				'\\mathbb{Z}',
				__( 'Insert integers', 'equation-editor' )
			),
			symbol(
				'rationals',
				'ℚ',
				'\\mathbb{Q}',
				__( 'Insert rational numbers', 'equation-editor' )
			),
			symbol(
				'reals',
				'ℝ',
				'\\mathbb{R}',
				__( 'Insert real numbers', 'equation-editor' )
			),
			symbol(
				'complex',
				'ℂ',
				'\\mathbb{C}',
				__( 'Insert complex numbers', 'equation-editor' )
			),
			symbol(
				'quaternions',
				'ℍ',
				'\\mathbb{H}',
				__( 'Insert quaternions', 'equation-editor' )
			),
			symbol(
				'projective-space',
				'ℙ',
				'\\mathbb{P}',
				__( 'Insert projective space', 'equation-editor' )
			),
			symbol(
				'emptyset',
				'∅',
				'\\emptyset',
				__( 'Insert empty set', 'equation-editor' )
			),
			symbol(
				'in',
				'∈',
				'\\in',
				__( 'Insert element of', 'equation-editor' )
			),
			symbol(
				'not-in',
				'∉',
				'\\notin',
				__( 'Insert not element of', 'equation-editor' )
			),
			symbol(
				'ni',
				'∋',
				'\\ni',
				__( 'Insert contains as member', 'equation-editor' )
			),
			symbol(
				'not-ni',
				'∌',
				'\\not\\ni',
				__( 'Insert does not contain as member', 'equation-editor' )
			),
			symbol(
				'subset',
				'⊂',
				'\\subset',
				__( 'Insert subset', 'equation-editor' )
			),
			symbol(
				'supset',
				'⊃',
				'\\supset',
				__( 'Insert superset', 'equation-editor' )
			),
			symbol(
				'subseteq',
				'⊆',
				'\\subseteq',
				__( 'Insert subset or equal', 'equation-editor' )
			),
			symbol(
				'supseteq',
				'⊇',
				'\\supseteq',
				__( 'Insert superset or equal', 'equation-editor' )
			),
			symbol(
				'not-subset',
				'⊄',
				'\\not\\subset',
				__( 'Insert not subset', 'equation-editor' )
			),
			symbol(
				'not-supset',
				'⊅',
				'\\not\\supset',
				__( 'Insert not superset', 'equation-editor' )
			),
			symbol(
				'forall',
				'∀',
				'\\forall',
				__( 'Insert for all', 'equation-editor' )
			),
			symbol(
				'exists',
				'∃',
				'\\exists',
				__( 'Insert exists', 'equation-editor' )
			),
			symbol(
				'neg',
				'¬',
				'\\neg',
				__( 'Insert negation', 'equation-editor' )
			),
			symbol(
				'therefore',
				'∴',
				'\\therefore',
				__( 'Insert therefore', 'equation-editor' )
			),
			symbol(
				'because',
				'∵',
				'\\because',
				__( 'Insert because', 'equation-editor' )
			),
		],
	},
	{
		id: 'arrows',
		label: __( 'Arrows', 'equation-editor' ),
		symbols: [
			symbol(
				'leftarrow',
				'←',
				'\\leftarrow',
				__( 'Insert left arrow', 'equation-editor' )
			),
			symbol(
				'rightarrow',
				'→',
				'\\rightarrow',
				__( 'Insert right arrow', 'equation-editor' )
			),
			symbol(
				'Leftarrow',
				'⇐',
				'\\Leftarrow',
				__( 'Insert double left arrow', 'equation-editor' )
			),
			symbol(
				'Rightarrow',
				'⇒',
				'\\Rightarrow',
				__( 'Insert double right arrow', 'equation-editor' )
			),
			symbol(
				'leftrightarrow',
				'↔',
				'\\leftrightarrow',
				__( 'Insert left right arrow', 'equation-editor' )
			),
			symbol(
				'Leftrightarrow',
				'⇔',
				'\\Leftrightarrow',
				__( 'Insert if and only if', 'equation-editor' )
			),
			symbol(
				'uparrow',
				'↑',
				'\\uparrow',
				__( 'Insert up arrow', 'equation-editor' )
			),
			symbol(
				'downarrow',
				'↓',
				'\\downarrow',
				__( 'Insert down arrow', 'equation-editor' )
			),
			symbol(
				'Uparrow',
				'⇑',
				'\\Uparrow',
				__( 'Insert double up arrow', 'equation-editor' )
			),
			symbol(
				'Downarrow',
				'⇓',
				'\\Downarrow',
				__( 'Insert double down arrow', 'equation-editor' )
			),
			symbol(
				'updownarrow',
				'↕',
				'\\updownarrow',
				__( 'Insert up down arrow', 'equation-editor' )
			),
			symbol(
				'Updownarrow',
				'⇕',
				'\\Updownarrow',
				__( 'Insert double up down arrow', 'equation-editor' )
			),
			symbol(
				'longleftrightarrow',
				'⟷',
				'\\longleftrightarrow',
				__( 'Insert long left right arrow', 'equation-editor' )
			),
			symbol(
				'mapsto',
				'↦',
				'\\mapsto',
				__( 'Insert maps to', 'equation-editor' )
			),
			symbol(
				'hookleftarrow',
				'↩',
				'\\hookleftarrow',
				__( 'Insert hooked left arrow', 'equation-editor' )
			),
			symbol(
				'hookrightarrow',
				'↪',
				'\\hookrightarrow',
				__( 'Insert hooked right arrow', 'equation-editor' )
			),
			symbol(
				'rightleftarrows',
				'⇄',
				'\\rightleftarrows',
				__( 'Insert opposing arrows', 'equation-editor' )
			),
			symbol(
				'nearrow',
				'↗',
				'\\nearrow',
				__( 'Insert northeast arrow', 'equation-editor' )
			),
			symbol(
				'searrow',
				'↘',
				'\\searrow',
				__( 'Insert southeast arrow', 'equation-editor' )
			),
			symbol(
				'swarrow',
				'↙',
				'\\swarrow',
				__( 'Insert southwest arrow', 'equation-editor' )
			),
			symbol(
				'nwarrow',
				'↖',
				'\\nwarrow',
				__( 'Insert northwest arrow', 'equation-editor' )
			),
			symbol(
				'leftharpoonup',
				'↼',
				'\\leftharpoonup',
				__( 'Insert left harpoon up', 'equation-editor' )
			),
			symbol(
				'rightharpoonup',
				'⇀',
				'\\rightharpoonup',
				__( 'Insert right harpoon up', 'equation-editor' )
			),
			symbol(
				'leftharpoondown',
				'↽',
				'\\leftharpoondown',
				__( 'Insert left harpoon down', 'equation-editor' )
			),
			symbol(
				'rightharpoondown',
				'⇁',
				'\\rightharpoondown',
				__( 'Insert right harpoon down', 'equation-editor' )
			),
		],
	},
	{
		id: 'symbols',
		label: __( 'Symbols', 'equation-editor' ),
		symbols: [
			symbol(
				'left-bracket',
				'[',
				'[',
				__( 'Insert left bracket', 'equation-editor' )
			),
			symbol(
				'right-bracket',
				']',
				']',
				__( 'Insert right bracket', 'equation-editor' )
			),
			symbol(
				'left-brace',
				'{',
				'\\{',
				__( 'Insert left brace', 'equation-editor' )
			),
			symbol(
				'right-brace',
				'}',
				'\\}',
				__( 'Insert right brace', 'equation-editor' )
			),
			symbol(
				'lfloor',
				'⌊',
				'\\lfloor',
				__( 'Insert left floor', 'equation-editor' )
			),
			symbol(
				'rfloor',
				'⌋',
				'\\rfloor',
				__( 'Insert right floor', 'equation-editor' )
			),
			symbol(
				'lceil',
				'⌈',
				'\\lceil',
				__( 'Insert left ceiling', 'equation-editor' )
			),
			symbol(
				'rceil',
				'⌉',
				'\\rceil',
				__( 'Insert right ceiling', 'equation-editor' )
			),
			symbol(
				'langle',
				'⟨',
				'\\langle',
				__( 'Insert left angle bracket', 'equation-editor' )
			),
			symbol(
				'rangle',
				'⟩',
				'\\rangle',
				__( 'Insert right angle bracket', 'equation-editor' )
			),
			symbol(
				'vertical-bar',
				'|',
				'|',
				__( 'Insert vertical bar', 'equation-editor' )
			),
			symbol(
				'Vert',
				'‖',
				'\\|',
				__( 'Insert double vertical bar', 'equation-editor' )
			),
			symbol(
				'backslash',
				'\\',
				'\\backslash',
				__( 'Insert backslash', 'equation-editor' )
			),
			symbol(
				'ell',
				'ℓ',
				'\\ell',
				__( 'Insert script ell', 'equation-editor' )
			),
			symbol(
				'hbar',
				'ℏ',
				'\\hbar',
				__( 'Insert h-bar', 'equation-editor' )
			),
			symbol(
				'wp',
				'℘',
				'\\wp',
				__( 'Insert Weierstrass p', 'equation-editor' )
			),
			symbol(
				'real-part',
				'ℜ',
				'\\Re',
				__( 'Insert real part', 'equation-editor' )
			),
			symbol(
				'imaginary-part',
				'ℑ',
				'\\Im',
				__( 'Insert imaginary part', 'equation-editor' )
			),
			symbol(
				'aleph',
				'ℵ',
				'\\aleph',
				__( 'Insert aleph', 'equation-editor' )
			),
			symbol(
				'degree',
				'°',
				'^\\circ',
				__( 'Insert degree', 'equation-editor' )
			),
			symbol(
				'angle',
				'∠',
				'\\angle',
				__( 'Insert angle', 'equation-editor' )
			),
			symbol(
				'top',
				'⊤',
				'\\top',
				__( 'Insert top', 'equation-editor' )
			),
			symbol(
				'flat',
				'♭',
				'\\flat',
				__( 'Insert flat', 'equation-editor' )
			),
			symbol(
				'natural',
				'♮',
				'\\natural',
				__( 'Insert natural', 'equation-editor' )
			),
			symbol(
				'sharp',
				'♯',
				'\\sharp',
				__( 'Insert sharp', 'equation-editor' )
			),
			symbol(
				'clubsuit',
				'♣',
				'\\clubsuit',
				__( 'Insert club suit', 'equation-editor' )
			),
			symbol(
				'diamondsuit',
				'♢',
				'\\diamondsuit',
				__( 'Insert diamond suit', 'equation-editor' )
			),
			symbol(
				'heartsuit',
				'♡',
				'\\heartsuit',
				__( 'Insert heart suit', 'equation-editor' )
			),
			symbol(
				'spadesuit',
				'♠',
				'\\spadesuit',
				__( 'Insert spade suit', 'equation-editor' )
			),
			symbol(
				'ldots',
				'…',
				'\\ldots',
				__( 'Insert ellipsis', 'equation-editor' )
			),
			symbol(
				'cdots',
				'⋯',
				'\\cdots',
				__( 'Insert centered ellipsis', 'equation-editor' )
			),
			symbol(
				'vdots',
				'⋮',
				'\\vdots',
				__( 'Insert vertical ellipsis', 'equation-editor' )
			),
			symbol(
				'ddots',
				'⋱',
				'\\ddots',
				__( 'Insert diagonal ellipsis', 'equation-editor' )
			),
		],
	},
	{
		// The Matrix tab renders a custom panel (matrix size grid, border and
		// row/column controls) instead of a flat glyph grid, so it carries a
		// `type` and no `symbols` list. See MatrixPanel and src/data/matrix.js.
		id: 'matrix',
		label: __( 'Matrix', 'equation-editor' ),
		type: 'matrix',
	},
];
