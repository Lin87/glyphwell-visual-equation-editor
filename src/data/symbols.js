const symbol = ( id, visual, latex, ariaLabel ) => ( {
	id,
	visual,
	latex,
	ariaLabel,
} );

export const SYMBOL_GROUPS = [
	{
		id: 'basic',
		label: 'Basic',
		rows: [
			[
				symbol( 'subscript', 'x□', 'x_{#0}', 'Insert subscript' ),
				symbol( 'superscript', 'x^□', 'x^{#0}', 'Insert superscript' ),
				symbol(
					'fraction',
					'n/m',
					'\\frac{#0}{#1}',
					'Insert fraction'
				),
				symbol(
					'square-root',
					'√',
					'\\sqrt{#0}',
					'Insert square root'
				),
				symbol( 'nth-root', 'ⁿ√', '\\sqrt[#0]{#1}', 'Insert nth root' ),
				symbol(
					'left-parenthesis',
					'(',
					'(',
					'Insert left parenthesis'
				),
				symbol(
					'right-parenthesis',
					')',
					')',
					'Insert right parenthesis'
				),
				symbol(
					'binomial',
					'(ⁿₘ)',
					'\\binom{#0}{#1}',
					'Insert binomial'
				),
				symbol( 'integral', '∫', '\\int', 'Insert integral' ),
				symbol( 'slash', '/', '/', 'Insert slash' ),
				symbol( 'plus', '+', '+', 'Insert plus' ),
				symbol( 'minus', '−', '-', 'Insert minus' ),
				symbol( 'plus-minus', '±', '\\pm', 'Insert plus minus' ),
				symbol( 'minus-plus', '∓', '\\mp', 'Insert minus plus' ),
				symbol( 'bullet', '•', '\\bullet', 'Insert bullet' ),
			],
			[
				symbol( 'equals', '=', '=', 'Insert equals' ),
				symbol( 'times', '×', '\\times', 'Insert multiplication sign' ),
				symbol( 'division', '÷', '\\div', 'Insert division sign' ),
				symbol( 'asterisk', '*', '*', 'Insert asterisk' ),
				symbol( 'therefore', '∴', '\\therefore', 'Insert therefore' ),
				symbol( 'because', '∵', '\\because', 'Insert because' ),
				symbol( 'sum', '∑', '\\sum', 'Insert summation' ),
				symbol( 'product', '∏', '\\prod', 'Insert product' ),
				symbol( 'coproduct', '∐', '\\coprod', 'Insert coproduct' ),
				symbol(
					'definite-integral',
					'∫ₐᵇ',
					'\\int_{#0}^{#1}',
					'Insert definite integral'
				),
				symbol( 'plain-integral', '∫', '\\int', 'Insert integral' ),
				symbol(
					'natural-numbers',
					'ℕ',
					'\\mathbb{N}',
					'Insert natural numbers'
				),
				symbol(
					'projective-space',
					'ℙ',
					'\\mathbb{P}',
					'Insert projective space'
				),
				symbol( 'integers', 'ℤ', '\\mathbb{Z}', 'Insert integers' ),
				symbol(
					'rationals',
					'ℚ',
					'\\mathbb{Q}',
					'Insert rational numbers'
				),
			],
			[
				symbol( 'reals', 'ℝ', '\\mathbb{R}', 'Insert real numbers' ),
				symbol(
					'complex',
					'ℂ',
					'\\mathbb{C}',
					'Insert complex numbers'
				),
				symbol(
					'quaternions',
					'ℍ',
					'\\mathbb{H}',
					'Insert quaternions'
				),
				symbol( 'bar', 'x̄', '\\bar{#0}', 'Insert overbar' ),
				symbol( 'hat', 'x̂', '\\hat{#0}', 'Insert hat accent' ),
				symbol( 'vector', 'v⃗', '\\vec{#0}', 'Insert vector accent' ),
			],
		],
	},
	{
		id: 'greek',
		label: 'Greek',
		rows: [
			[
				symbol( 'alpha', 'α', '\\alpha', 'Insert alpha' ),
				symbol( 'beta', 'β', '\\beta', 'Insert beta' ),
				symbol( 'gamma', 'γ', '\\gamma', 'Insert gamma' ),
				symbol( 'delta', 'δ', '\\delta', 'Insert delta' ),
				symbol( 'epsilon', 'ϵ', '\\epsilon', 'Insert epsilon' ),
				symbol( 'zeta', 'ζ', '\\zeta', 'Insert zeta' ),
				symbol( 'eta', 'η', '\\eta', 'Insert eta' ),
				symbol( 'theta', 'θ', '\\theta', 'Insert theta' ),
				symbol( 'iota', 'ι', '\\iota', 'Insert iota' ),
				symbol( 'kappa', 'κ', '\\kappa', 'Insert kappa' ),
				symbol( 'lambda', 'λ', '\\lambda', 'Insert lambda' ),
				symbol( 'mu', 'μ', '\\mu', 'Insert mu' ),
				symbol( 'nu', 'ν', '\\nu', 'Insert nu' ),
				symbol( 'xi', 'ξ', '\\xi', 'Insert xi' ),
				symbol( 'pi', 'π', '\\pi', 'Insert pi' ),
			],
			[
				symbol( 'rho', 'ρ', '\\rho', 'Insert rho' ),
				symbol( 'sigma', 'σ', '\\sigma', 'Insert sigma' ),
				symbol( 'tau', 'τ', '\\tau', 'Insert tau' ),
				symbol( 'upsilon', 'υ', '\\upsilon', 'Insert upsilon' ),
				symbol( 'phi', 'φ', '\\phi', 'Insert phi' ),
				symbol( 'chi', 'χ', '\\chi', 'Insert chi' ),
				symbol( 'psi', 'ψ', '\\psi', 'Insert psi' ),
				symbol( 'omega', 'ω', '\\omega', 'Insert omega' ),
				symbol( 'digamma', 'Ϝ', '\\digamma', 'Insert digamma' ),
				symbol(
					'varepsilon',
					'ε',
					'\\varepsilon',
					'Insert varepsilon'
				),
				symbol( 'vartheta', 'ϑ', '\\vartheta', 'Insert vartheta' ),
				symbol( 'varkappa', 'ϰ', '\\varkappa', 'Insert varkappa' ),
				symbol( 'varpi', 'ϖ', '\\varpi', 'Insert varpi' ),
				symbol( 'varrho', 'ϱ', '\\varrho', 'Insert varrho' ),
				symbol( 'varsigma', 'ς', '\\varsigma', 'Insert varsigma' ),
			],
			[
				symbol( 'varphi', 'ϕ', '\\varphi', 'Insert varphi' ),
				symbol(
					'gamma-uppercase',
					'Γ',
					'\\Gamma',
					'Insert uppercase gamma'
				),
				symbol(
					'delta-uppercase',
					'Δ',
					'\\Delta',
					'Insert uppercase delta'
				),
				symbol(
					'theta-uppercase',
					'Θ',
					'\\Theta',
					'Insert uppercase theta'
				),
				symbol(
					'lambda-uppercase',
					'Λ',
					'\\Lambda',
					'Insert uppercase lambda'
				),
				symbol( 'xi-uppercase', 'Ξ', '\\Xi', 'Insert uppercase xi' ),
				symbol( 'pi-uppercase', 'Π', '\\Pi', 'Insert uppercase pi' ),
				symbol(
					'sigma-uppercase',
					'Σ',
					'\\Sigma',
					'Insert uppercase sigma'
				),
				symbol(
					'upsilon-uppercase',
					'Υ',
					'\\Upsilon',
					'Insert uppercase upsilon'
				),
				symbol( 'phi-uppercase', 'Φ', '\\Phi', 'Insert uppercase phi' ),
				symbol( 'psi-uppercase', 'Ψ', '\\Psi', 'Insert uppercase psi' ),
				symbol(
					'omega-uppercase',
					'Ω',
					'\\Omega',
					'Insert uppercase omega'
				),
			],
		],
	},
	{
		id: 'operators',
		label: 'Operators',
		rows: [
			[
				symbol( 'wedge', '∧', '\\wedge', 'Insert wedge' ),
				symbol( 'vee', '∨', '\\vee', 'Insert vee' ),
				symbol( 'cup', '∪', '\\cup', 'Insert union' ),
				symbol( 'cap', '∩', '\\cap', 'Insert intersection' ),
				symbol( 'diamond', '◇', '\\diamond', 'Insert diamond' ),
				symbol( 'triangle', '△', '\\triangle', 'Insert triangle' ),
				symbol( 'ominus', '⊖', '\\ominus', 'Insert circled minus' ),
				symbol( 'uplus', '⊎', '\\uplus', 'Insert multiset union' ),
				symbol( 'otimes', '⊗', '\\otimes', 'Insert tensor product' ),
				symbol( 'oplus', '⊕', '\\oplus', 'Insert direct sum' ),
				symbol(
					'triangledown',
					'▽',
					'\\triangledown',
					'Insert down triangle'
				),
				symbol( 'sqcap', '⊓', '\\sqcap', 'Insert square cap' ),
				symbol(
					'triangleleft',
					'◁',
					'\\triangleleft',
					'Insert left triangle'
				),
				symbol( 'sqcup', '⊔', '\\sqcup', 'Insert square cup' ),
				symbol(
					'triangleright',
					'▷',
					'\\triangleright',
					'Insert right triangle'
				),
			],
			[
				symbol( 'odot', '⊙', '\\odot', 'Insert circled dot' ),
				symbol( 'circ', '○', '\\circ', 'Insert circle operator' ),
				symbol( 'dagger', '†', '\\dagger', 'Insert dagger' ),
				symbol( 'ddagger', '‡', '\\ddagger', 'Insert double dagger' ),
				symbol(
					'left-brace-operator',
					'{',
					'\\{',
					'Insert left brace'
				),
				symbol( 'amalg', '⨿', '\\amalg', 'Insert amalgamation symbol' ),
			],
		],
	},
	{
		id: 'relationships',
		label: 'Relationships',
		rows: [
			[
				symbol( 'less-than', '<', '<', 'Insert less than' ),
				symbol( 'greater-than', '>', '>', 'Insert greater than' ),
				symbol( 'equiv', '≡', '\\equiv', 'Insert equivalent to' ),
				symbol( 'cong', '≅', '\\cong', 'Insert congruent to' ),
				symbol( 'sim', '∼', '\\sim', 'Insert similar to' ),
				symbol( 'not-cong', '≇', '\\ncong', 'Insert not congruent to' ),
				symbol( 'not-equal', '≠', '\\neq', 'Insert not equal' ),
				symbol( 'propto', '∝', '\\propto', 'Insert proportional to' ),
				symbol(
					'approx',
					'≈',
					'\\approx',
					'Insert approximately equal'
				),
				symbol(
					'less-equal',
					'≤',
					'\\leq',
					'Insert less than or equal to'
				),
				symbol(
					'greater-equal',
					'≥',
					'\\geq',
					'Insert greater than or equal to'
				),
				symbol( 'in', '∈', '\\in', 'Insert element of' ),
				symbol( 'ni', '∋', '\\ni', 'Insert contains as member' ),
				symbol( 'subset', '⊂', '\\subset', 'Insert subset' ),
				symbol( 'supset', '⊃', '\\supset', 'Insert superset' ),
			],
			[
				symbol( 'not-in', '∉', '\\notin', 'Insert not element of' ),
				symbol(
					'not-ni',
					'∌',
					'\\not\\ni',
					'Insert does not contain as member'
				),
				symbol(
					'subseteq',
					'⊆',
					'\\subseteq',
					'Insert subset or equal'
				),
				symbol(
					'supseteq',
					'⊇',
					'\\supseteq',
					'Insert superset or equal'
				),
				symbol( 'not-subset', '⊄', '\\nsubset', 'Insert not subset' ),
				symbol( 'not-supset', '⊅', '\\nsupset', 'Insert not superset' ),
				symbol( 'models', '⊨', '\\models', 'Insert models' ),
				symbol( 'prec', '≺', '\\prec', 'Insert precedes' ),
				symbol( 'succ', '≻', '\\succ', 'Insert succeeds' ),
				symbol( 'preceq', '≼', '\\preceq', 'Insert precedes or equal' ),
				symbol( 'succeq', '≽', '\\succeq', 'Insert succeeds or equal' ),
				symbol(
					'simeq',
					'≃',
					'\\simeq',
					'Insert asymptotically equal'
				),
				symbol( 'mid', '|', '\\mid', 'Insert divides' ),
				symbol( 'll', '≪', '\\ll', 'Insert much less than' ),
				symbol( 'gg', '≫', '\\gg', 'Insert much greater than' ),
			],
			[
				symbol( 'parallel', '∥', '\\parallel', 'Insert parallel' ),
				symbol( 'bowtie', '⋈', '\\bowtie', 'Insert bowtie' ),
				symbol( 'sqsubset', '⊏', '\\sqsubset', 'Insert square subset' ),
				symbol(
					'sqsupset',
					'⊐',
					'\\sqsupset',
					'Insert square superset'
				),
				symbol( 'smile', '⌣', '\\smile', 'Insert smile' ),
				symbol(
					'sqsubseteq',
					'⊑',
					'\\sqsubseteq',
					'Insert square subset or equal'
				),
				symbol(
					'sqsupseteq',
					'⊒',
					'\\sqsupseteq',
					'Insert square superset or equal'
				),
				symbol( 'doteq', '≐', '\\doteq', 'Insert dotted equals' ),
				symbol( 'frown', '⌢', '\\frown', 'Insert frown' ),
				symbol( 'vdash', '⊢', '\\vdash', 'Insert turnstile' ),
				symbol( 'dashv', '⊣', '\\dashv', 'Insert reverse turnstile' ),
				symbol( 'exists', '∃', '\\exists', 'Insert exists' ),
				symbol( 'emptyset', '∅', '\\emptyset', 'Insert empty set' ),
			],
		],
	},
	{
		id: 'arrows',
		label: 'Arrows',
		rows: [
			[
				symbol( 'leftarrow', '←', '\\leftarrow', 'Insert left arrow' ),
				symbol(
					'rightarrow',
					'→',
					'\\rightarrow',
					'Insert right arrow'
				),
				symbol(
					'Leftarrow',
					'⇐',
					'\\Leftarrow',
					'Insert double left arrow'
				),
				symbol(
					'Rightarrow',
					'⇒',
					'\\Rightarrow',
					'Insert double right arrow'
				),
				symbol(
					'leftrightarrow',
					'↔',
					'\\leftrightarrow',
					'Insert left right arrow'
				),
				symbol(
					'updownarrow',
					'↕',
					'\\updownarrow',
					'Insert up down arrow'
				),
				symbol(
					'longleftrightarrow',
					'⟷',
					'\\longleftrightarrow',
					'Insert long left right arrow'
				),
				symbol(
					'Updownarrow',
					'⇕',
					'\\Updownarrow',
					'Insert double up down arrow'
				),
				symbol( 'mapsto', '↦', '\\mapsto', 'Insert maps to' ),
				symbol(
					'nearrow',
					'↗',
					'\\nearrow',
					'Insert northeast arrow'
				),
				symbol(
					'hookleftarrow',
					'↩',
					'\\hookleftarrow',
					'Insert hooked left arrow'
				),
				symbol(
					'hookrightarrow',
					'↪',
					'\\hookrightarrow',
					'Insert hooked right arrow'
				),
				symbol(
					'searrow',
					'↘',
					'\\searrow',
					'Insert southeast arrow'
				),
				symbol(
					'leftharpoonup',
					'↼',
					'\\leftharpoonup',
					'Insert left harpoon up'
				),
				symbol(
					'rightharpoonup',
					'⇀',
					'\\rightharpoonup',
					'Insert right harpoon up'
				),
			],
			[
				symbol(
					'swarrow',
					'↙',
					'\\swarrow',
					'Insert southwest arrow'
				),
				symbol(
					'leftharpoondown',
					'↽',
					'\\leftharpoondown',
					'Insert left harpoon down'
				),
				symbol(
					'rightharpoondown',
					'⇁',
					'\\rightharpoondown',
					'Insert right harpoon down'
				),
				symbol(
					'nwarrow',
					'↖',
					'\\nwarrow',
					'Insert northwest arrow'
				),
				symbol( 'downarrow', '↓', '\\downarrow', 'Insert down arrow' ),
				symbol(
					'Downarrow',
					'⇓',
					'\\Downarrow',
					'Insert double down arrow'
				),
				symbol( 'uparrow', '↑', '\\uparrow', 'Insert up arrow' ),
				symbol( 'Uparrow', '⇑', '\\Uparrow', 'Insert double up arrow' ),
				symbol( 'to', '→', '\\to', 'Insert right arrow' ),
				symbol( 'implies', '⇒', '\\Rightarrow', 'Insert implies' ),
				symbol( 'gets', '←', '\\leftarrow', 'Insert left arrow' ),
				symbol( 'implied-by', '⇐', '\\Leftarrow', 'Insert implied by' ),
				symbol(
					'leftrightarrow-second',
					'↔',
					'\\leftrightarrow',
					'Insert left right arrow'
				),
				symbol(
					'Leftrightarrow',
					'⇔',
					'\\Leftrightarrow',
					'Insert if and only if'
				),
				symbol(
					'rightleftarrows',
					'⇄',
					'\\rightleftarrows',
					'Insert opposing arrows'
				),
			],
		],
	},
	{
		id: 'delimiters',
		label: 'Delimiters',
		rows: [
			[
				symbol( 'lfloor', '⌊', '\\lfloor', 'Insert left floor' ),
				symbol( 'rfloor', '⌋', '\\rfloor', 'Insert right floor' ),
				symbol( 'lceil', '⌈', '\\lceil', 'Insert left ceiling' ),
				symbol( 'rceil', '⌉', '\\rceil', 'Insert right ceiling' ),
				symbol( 'delimiter-slash', '/', '/', 'Insert slash' ),
				symbol( 'left-brace', '{', '\\{', 'Insert left brace' ),
				symbol( 'right-brace', '}', '\\}', 'Insert right brace' ),
			],
		],
	},
	{
		id: 'misc',
		label: 'Misc',
		rows: [
			[
				symbol( 'forall', '∀', '\\forall', 'Insert for all' ),
				symbol( 'ldots', '…', '\\ldots', 'Insert ellipsis' ),
				symbol( 'cdots', '⋯', '\\cdots', 'Insert centered ellipsis' ),
				symbol( 'vdots', '⋮', '\\vdots', 'Insert vertical ellipsis' ),
				symbol( 'ddots', '⋱', '\\ddots', 'Insert diagonal ellipsis' ),
				symbol(
					'misc-square-root',
					'√',
					'\\sqrt{#0}',
					'Insert square root'
				),
				symbol( 'misc-triangle', '△', '\\triangle', 'Insert triangle' ),
				symbol( 'ell', 'ℓ', '\\ell', 'Insert script ell' ),
				symbol( 'top', '⊤', '\\top', 'Insert top' ),
				symbol( 'flat', '♭', '\\flat', 'Insert flat' ),
				symbol( 'natural', '♮', '\\natural', 'Insert natural' ),
				symbol( 'sharp', '♯', '\\sharp', 'Insert sharp' ),
				symbol( 'wp', '℘', '\\wp', 'Insert Weierstrass p' ),
				symbol( 'perp', '⊥', '\\perp', 'Insert perpendicular' ),
				symbol( 'clubsuit', '♣', '\\clubsuit', 'Insert club suit' ),
			],
			[
				symbol(
					'diamondsuit',
					'♢',
					'\\diamondsuit',
					'Insert diamond suit'
				),
				symbol( 'heartsuit', '♡', '\\heartsuit', 'Insert heart suit' ),
				symbol( 'spadesuit', '♠', '\\spadesuit', 'Insert spade suit' ),
				symbol( 'backslash', '\\', '\\backslash', 'Insert backslash' ),
				symbol( 'vertical-bar', '|', '|', 'Insert vertical bar' ),
				symbol( 'misc-perp', '⊥', '\\perp', 'Insert perpendicular' ),
				symbol( 'nabla', '∇', '\\nabla', 'Insert nabla' ),
				symbol( 'hbar', 'ℏ', '\\hbar', 'Insert h-bar' ),
				symbol( 'misc-circ', '○', '\\circ', 'Insert circle operator' ),
				symbol( 'misc-bullet', '●', '\\bullet', 'Insert bullet' ),
				symbol( 'setminus', '\\', '\\setminus', 'Insert set minus' ),
				symbol( 'neg', '¬', '\\neg', 'Insert negation' ),
				symbol( 'real-part', 'ℜ', '\\Re', 'Insert real part' ),
				symbol(
					'imaginary-part',
					'ℑ',
					'\\Im',
					'Insert imaginary part'
				),
				symbol(
					'partial',
					'∂',
					'\\partial',
					'Insert partial derivative'
				),
			],
			[
				symbol( 'infty', '∞', '\\infty', 'Insert infinity' ),
				symbol( 'aleph', 'ℵ', '\\aleph', 'Insert aleph' ),
				symbol( 'degree', '°', '^\\circ', 'Insert degree' ),
				symbol( 'angle', '∠', '\\angle', 'Insert angle' ),
			],
		],
	},
];
