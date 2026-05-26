# Codex Tasks: Equation Editor WordPress Plugin

## Objective

Build a WordPress plugin named **Equation Editor**.

The plugin must provide:

1. A standalone block editor block: `equation-editor/equation`.
2. An inline rich-text equation format: `equation-editor/inline-equation`.
3. MathLive WYSIWYG equation authoring.
4. A custom symbol palette that exactly matches the provided screenshots.
5. LaTeX as the editable source.
6. Generated MathML as the stored display output.
7. WordPress built-in math display support when available.
8. Locally bundled KaTeX fallback rendering when WordPress built-in math display is unavailable.
9. SCSS editor UI styling.
10. WordPress.org-ready packaging.

## Source references

Visual symbol palette source files:

```text
docs/reference/symbol-palette/basic.png
docs/reference/symbol-palette/greek.png
docs/reference/symbol-palette/operators.png
docs/reference/symbol-palette/relationships.png
docs/reference/symbol-palette/arrows.png
docs/reference/symbol-palette/delimiters.png
docs/reference/symbol-palette/misc.png
```

Zoomed reference images are available in:

```text
docs/reference/symbol-palette/zoom/
```

Use these screenshots as the visual source of truth.

## Expected file structure

Create or update the project to use this structure:

```text
equation-editor/
├── equation-editor.php
├── readme.txt
├── package.json
├── package-lock.json
├── webpack.config.js
├── .gitignore
├── includes/
│   ├── assets.php
│   ├── blocks.php
│   ├── inline-format.php
│   ├── math-support.php
│   └── sanitization.php
├── src/
│   ├── blocks/
│   │   └── equation/
│   │       ├── block.json
│   │       ├── index.js
│   │       ├── edit.js
│   │       ├── save.js
│   │       ├── render.php
│   │       ├── editor.scss
│   │       └── style.scss
│   ├── components/
│   │   ├── EquationPopover.js
│   │   ├── MathFieldControl.js
│   │   ├── SymbolButton.js
│   │   ├── SymbolPalette.js
│   │   └── SymbolTabs.js
│   ├── data/
│   │   └── symbols.js
│   ├── formats/
│   │   └── inline-equation/
│   │       ├── index.js
│   │       └── editor.scss
│   └── frontend/
│   │   ├── katex-fallback.js
│   │   └── frontend.scss
├── build/
├── assets/
│   └── screenshots/
├── docs/
│   └── reference/
│       └── symbol-palette/
└── tests/
    ├── e2e/
    └── unit/
```

## Milestone 1: Plugin scaffold

### Tasks

- Create the main plugin file: `equation-editor.php`.
- Add plugin constants:
  - `EQUATION_EDITOR_VERSION`
  - `EQUATION_EDITOR_PLUGIN_FILE`
  - `EQUATION_EDITOR_PLUGIN_DIR`
  - `EQUATION_EDITOR_PLUGIN_URL`
- Add the required plugin header:
  - `Plugin Name: Equation Editor`
  - `Description`
  - `Version`
  - `Requires at least: 6.3`
  - `Requires PHP: 8.0`
  - `License: GPL-2.0-or-later`
- Load the PHP files from `includes/`.
- Create initial includes:
  - `includes/assets.php`
  - `includes/blocks.php`
  - `includes/inline-format.php`
  - `includes/math-support.php`
  - `includes/sanitization.php`
- Create `package.json`.
- Create `webpack.config.js`.
- Create `.gitignore`.
- Create placeholder `readme.txt`.

### Acceptance criteria

- Plugin activates without fatal errors.
- `npm install` works.
- `npm run build` works, even if the plugin only contains placeholder block assets at this point.
- No CDN assets are used.

## Milestone 2: Build setup

### Tasks

Add dependencies:

```bash
npm install --save mathlive katex
npm install --save-dev @wordpress/scripts postcss
```

Configure scripts:

```json
{
  "start": "wp-scripts start --webpack-copy-php",
  "build": "wp-scripts build --webpack-copy-php",
  "format": "wp-scripts format",
  "lint:js": "wp-scripts lint-js",
  "lint:css": "wp-scripts lint-style",
  "test:unit": "wp-scripts test-unit-js",
  "test:e2e": "wp-scripts test-e2e",
  "plugin-zip": "wp-scripts plugin-zip"
}
```

Extend `@wordpress/scripts` webpack config only where needed.

The webpack config must support:

- block editor entry points
- inline format entry point
- frontend KaTeX fallback entry point
- CSS extraction
- MathLive font/static asset handling
- KaTeX CSS/font handling

### Acceptance criteria

- `npm run build` generates files in `build/`.
- Generated PHP render files are copied into `build/` when needed.
- Generated asset files are suitable for WordPress enqueueing.

## Milestone 3: Standalone Equation block

### Tasks

Create:

```text
src/blocks/equation/block.json
src/blocks/equation/index.js
src/blocks/equation/edit.js
src/blocks/equation/save.js
src/blocks/equation/render.php
src/blocks/equation/editor.scss
src/blocks/equation/style.scss
```

Use this block name:

```text
equation-editor/equation
```

Use this block title:

```text
Equation
```

Use these attributes:

```json
{
  "latex": {
    "type": "string",
    "default": ""
  },
  "mathML": {
    "type": "string",
    "default": ""
  },
  "textAlign": {
    "type": "string",
    "default": "center"
  }
}
```

Use a dynamic block render file.

`save.js` should return `null`.

Register the block server-side in:

```text
includes/blocks.php
```

Use:

```php
register_block_type_from_metadata(
	EQUATION_EDITOR_PLUGIN_DIR . 'build/blocks/equation'
);
```

Add a toolbar alignment control with:

- left
- center
- right

Store the selected alignment in `textAlign`.

Use frontend classes:

```text
has-text-align-left
has-text-align-center
has-text-align-right
```

### Acceptance criteria

- Equation block appears in the block inserter.
- The block can be inserted into a post.
- The block stores `latex`, `mathML`, and `textAlign`.
- Left, center, and right alignment work in editor and frontend.
- The block remains separate from `core/math`.

## Milestone 4: MathLive editor component

### Tasks

Create:

```text
src/components/MathFieldControl.js
```

The component must:

- Render a MathLive `<math-field>`.
- Accept `latex`, `onLatexChange`, and `onMathMLChange` props.
- Update LaTeX on MathLive input.
- Generate MathML from MathLive output.
- Preserve focus when inserting symbols.
- Expose an insertion method through a React ref or callback.
- Support both block and inline popover usage.

Recommended behavior:

```js
const latex = mathfield.value;
const mathML = mathfield.getValue( 'math-ml' );
```

Use MathLive APIs where supported.

Do not use MathLive’s default virtual keyboard as the primary interface.

The custom tabbed symbol palette is required.

### Acceptance criteria

- Typing in MathLive updates the block’s LaTeX attribute.
- MathML is generated and stored.
- Invalid input does not break the editor.
- The same component can be used by the inline equation popover.

## Milestone 5: Exact symbol palette

### Tasks

Create:

```text
src/data/symbols.js
src/components/SymbolPalette.js
src/components/SymbolTabs.js
src/components/SymbolButton.js
```

The palette must exactly match the screenshots.

Required tab order:

```text
Basic
Greek
Operators
Relationships
Arrows
Delimiters
Misc
```

Use a row-based symbol structure so row wrapping can match the screenshots.

Recommended data shape:

```js
export const SYMBOL_GROUPS = [
	{
		id: 'basic',
		label: 'Basic',
		rows: [
			[
				{
					id: 'subscript',
					visual: 'x□',
					latex: 'x_{#0}',
					ariaLabel: 'Insert subscript',
				},
			],
		],
	},
];
```

### Visual inventory

Use this inventory as a starting point, but verify against the screenshots.

#### Basic

Rows:

```text
x□, x^□, n/m, √, ⁿ√, (, ), (n over m), ∫, /, +, −, ±, ∓, •
=, ×, ÷, *, ∴, ∵, ∑, ∏, ∐, definite integral, ∫, ℕ, ℙ, ℤ, ℚ
ℝ, ℂ, ℍ, x̄, x̂, v⃗
```

Use likely LaTeX commands:

```text
x_{#0}
x^{#0}
\frac{#0}{#1}
\sqrt{#0}
\sqrt[#0]{#1}
(
)
\binom{#0}{#1}
\int
/
+
-
\pm
\mp
\bullet
=
\times
\div
*
\therefore
\because
\sum
\prod
\coprod
\int_{#0}^{#1}
\int
\mathbb{N}
\mathbb{P}
\mathbb{Z}
\mathbb{Q}
\mathbb{R}
\mathbb{C}
\mathbb{H}
\bar{#0}
\hat{#0}
\vec{#0}
```

#### Greek

Rows:

```text
α, β, γ, δ, ϵ, ζ, η, θ, ι, κ, λ, μ, ν, ξ, π
ρ, σ, τ, υ, φ, χ, ψ, ω, Ϝ, ε, ϑ, ϰ, ϖ, ϱ, ς
ϕ, Γ, Δ, Θ, Λ, Ξ, Π, Σ, Υ, Φ, Ψ, Ω
```

Use likely LaTeX commands:

```text
\alpha
\beta
\gamma
\delta
\epsilon
\zeta
\eta
\theta
\iota
\kappa
\lambda
\mu
\nu
\xi
\pi
\rho
\sigma
\tau
\upsilon
\phi
\chi
\psi
\omega
\digamma
\varepsilon
\vartheta
\varkappa
\varpi
\varrho
\varsigma
\varphi
\Gamma
\Delta
\Theta
\Lambda
\Xi
\Pi
\Sigma
\Upsilon
\Phi
\Psi
\Omega
```

#### Operators

Rows:

```text
∧, ∨, ∪, ∩, ◇, △, ⊖, ⊎, ⊗, ⊕, ▽, ⊓, ◁, ⊔, ▷
⊙, ○, †, ‡, {, ⨿/amalg-like symbol
```

Use likely LaTeX commands:

```text
\wedge
\vee
\cup
\cap
\diamond
\triangle
\ominus
\uplus
\otimes
\oplus
\triangledown
\sqcap
\triangleleft
\sqcup
\triangleright
\odot
\circ
\dagger
\ddagger
\{
\amalg
```

#### Relationships

Rows:

```text
<, >, ≡, ≅, ∼, not-congruent/not-equivalent, ≠, ∝, ≈, ≤, ≥, ∈, ∋, ⊂, ⊃
∉, ∌, ⊆, ⊇, ⊄, ⊅, ⊨, ≺, ≻, ≼, ≽, ≃, |, ≪, ≫
∥, ⋈, ⊏, ⊐, ⌣, ⊑, ⊒, ≐, ⌢, ⊢, ⊣, ∃, ∅
```

Use likely LaTeX commands:

```text
<
>
\equiv
\cong
\sim
\ncong
\neq
\propto
\approx
\leq
\geq
\in
\ni
\subset
\supset
\notin
\not\ni
\subseteq
\supseteq
\nsubset
\nsupset
\models
\prec
\succ
\preceq
\succeq
\simeq
\mid
\ll
\gg
\parallel
\bowtie
\sqsubset
\sqsupset
\smile
\sqsubseteq
\sqsupseteq
\doteq
\frown
\vdash
\dashv
\exists
\emptyset
```

#### Arrows

Rows:

```text
←, →, ⇐, ⇒, ↔, ↕, horizontal double-headed arrow, ⇕, ↦, ↗, ↩, ↪, ↘, left harpoon/angle arrow, right harpoon/angle arrow
↙, left harpoon, right harpoon, ↖, ↓, ⇓, ↑, ⇑, →, ⇒, ←, ⇐, ↔, ⇔, ⇄
```

Use likely LaTeX commands:

```text
\leftarrow
\rightarrow
\Leftarrow
\Rightarrow
\leftrightarrow
\updownarrow
\longleftrightarrow
\Updownarrow
\mapsto
\nearrow
\hookleftarrow
\hookrightarrow
\searrow
\leftharpoonup
\rightharpoonup
\swarrow
\leftharpoonup
\rightharpoonup
\nwarrow
\downarrow
\Downarrow
\uparrow
\Uparrow
\to
\Rightarrow
\leftarrow
\Leftarrow
\leftrightarrow
\Leftrightarrow
\rightleftarrows
```

#### Delimiters

Rows:

```text
⌊, ⌋, ⌈, ⌉, /, {, }
```

Use likely LaTeX commands:

```text
\lfloor
\rfloor
\lceil
\rceil
/
\{
\}
```

#### Misc

Rows:

```text
∀, …, ⋯, ⋮, ⋱, √, △, ℓ, ⊤, ♭, ♮, ♯, ℘, ⊥, ♣
♢, ♡, ♠, \, |, ⊥, ∇, ℏ, ○, ●, \, ¬, ℜ, ℑ, ∂
∞, ℵ, °, ∠
```

Use likely LaTeX commands:

```text
\forall
\ldots
\cdots
\vdots
\ddots
\sqrt{#0}
\triangle
\ell
\top
\flat
\natural
\sharp
\wp
\perp
\clubsuit
\diamondsuit
\heartsuit
\spadesuit
\backslash
|
\perp
\nabla
\hbar
\circ
\bullet
\setminus
\neg
\Re
\Im
\partial
\infty
\aleph
^\circ
\angle
```

### Symbol button behavior

Each symbol button must:

- Be keyboard focusable.
- Have an `aria-label`.
- Insert into the active MathLive field.
- Preserve or restore focus after insertion.
- Use MathLive insertion placeholders where useful.
- Match the screenshot’s button styling as closely as possible.

Recommended insertion behavior:

```js
mathfield.executeCommand( [
	'insert',
	symbol.latex,
	{
		insertionMode: 'replaceSelection',
		selectionMode: 'placeholder',
	},
] );
```

### Acceptance criteria

- The seven tabs match the screenshot labels and order.
- Symbol ordering matches the screenshots.
- The palette is reused by block and inline UI.
- The palette can be used with keyboard-only navigation.
- Symbols insert correctly into MathLive.

## Milestone 6: Inline equation format

### Tasks

Create:

```text
src/formats/inline-equation/index.js
src/formats/inline-equation/editor.scss
src/components/EquationPopover.js
```

Register the format from:

```text
includes/inline-format.php
```

Use the format name:

```text
equation-editor/inline-equation
```

The inline toolbar button must open a popover.

The popover must contain:

- MathLive field
- exact symbol palette
- optional raw LaTeX text fallback display
- apply/update button if needed
- remove/clear control if editing existing equation

Use WordPress RichText format APIs.

Prefer an inline object approach using `insertObject` where compatible.

Store:

- LaTeX in `data-equation-editor-latex`
- MathML as inner HTML
- `display="inline"`

### Acceptance criteria

- Inline equation toolbar button appears in rich text fields.
- User can insert an inline equation.
- User can edit an existing inline equation.
- User can remove an inline equation.
- Inline equation survives save/reload.
- KSES does not strip required MathML tags for users who can edit posts but do not have `unfiltered_html`.

## Milestone 7: PHP sanitization

### Tasks

Implement in:

```text
includes/sanitization.php
```

Required helpers:

```php
function equation_editor_allowed_mathml_tags(): array
function equation_editor_sanitize_mathml( string $mathml ): string
function equation_editor_extend_allowed_post_tags( array $tags, string $context ): array
```

Add allowed MathML tags such as:

```text
math
mi
mn
mo
ms
mtext
mrow
msup
msub
msubsup
mfrac
msqrt
mroot
mtable
mtr
mtd
munder
mover
munderover
semantics
annotation
```

Allowed attributes must be minimal.

Allow only safe attributes such as:

```text
class
display
xmlns
encoding
data-equation-editor-latex
```

Do not allow:

```text
style
script
src
href
onclick
onload
onerror
any event handler
```

Hook into:

```php
wp_kses_allowed_html
```

Only extend the `post` context.

### Acceptance criteria

- MathML output is sanitized.
- Inline equation markup is not stripped during post save.
- Unsafe attributes are removed.
- Raw MathML is never printed without sanitization.

## Milestone 8: Rendering and fallback assets

### Tasks

Implement in:

```text
includes/math-support.php
includes/assets.php
src/frontend/katex-fallback.js
src/frontend/frontend.scss
```

Create helper:

```php
function equation_editor_has_core_math_support(): bool
```

Create frontend asset helpers:

```php
function equation_editor_register_frontend_assets(): void
function equation_editor_enqueue_katex_fallback_assets(): void
function equation_editor_content_has_inline_equation( string $content ): bool
```

For standalone block rendering:

```text
src/blocks/equation/render.php
```

Logic:

```text
If latex and mathML are both empty:
    return empty string

If WordPress core math support exists and mathML is available:
    output sanitized MathML

Otherwise:
    enqueue KaTeX fallback assets
    output fallback placeholder with escaped LaTeX
```

Recommended fallback HTML:

```html
<figure class="wp-block-equation-editor-equation equation-editor-equation has-text-align-center">
	<span
		class="equation-editor__fallback"
		data-display-mode="block"
		data-latex="..."
	></span>
	<noscript>...</noscript>
</figure>
```

For inline equations on older WordPress versions:

- scan post content for `equation-editor-inline`
- enqueue KaTeX fallback assets when needed
- render each inline equation from `data-equation-editor-latex`

Frontend JS should target only plugin markup.

Do not auto-render all page content.

Recommended frontend JS behavior:

```js
import katex from 'katex';
import 'katex/dist/katex.min.css';

const renderEquation = ( element, displayMode ) => {
	const latex = element.dataset.latex || element.dataset.equationEditorLatex || '';

	if ( ! latex ) {
		return;
	}

	katex.render( latex, element, {
		displayMode,
		throwOnError: false,
		output: 'htmlAndMathml',
		trust: false,
		maxSize: 20,
		maxExpand: 1000,
	} );
};

document.querySelectorAll( '.equation-editor__fallback' ).forEach( ( element ) => {
	renderEquation( element, element.dataset.displayMode === 'block' );
} );

document
	.querySelectorAll( '.equation-editor-inline[data-equation-editor-latex]' )
	.forEach( ( element ) => {
		renderEquation( element, false );
	} );
```

### Acceptance criteria

- WordPress with built-in math display renders sanitized MathML without KaTeX fallback for standalone blocks.
- WordPress without built-in math display renders standalone equations through bundled KaTeX.
- WordPress without built-in math display renders inline equations through bundled KaTeX.
- KaTeX assets are not enqueued on pages that do not need them.
- No CDN assets are loaded.

## Milestone 9: Editor styling with SCSS

### Tasks

Use SCSS and stable plugin classes for editor UI.

Use stable plugin classes for frontend.

Style:

- tab list
- active tab
- symbol button grid
- MathLive wrapper
- popover layout
- toolbar controls
- alignment preview

### Acceptance criteria

- Editor UI visually resembles the screenshots.
- Frontend content does not contain editor-only utility classes.
- Editor CSS does not break WordPress admin layout.
- Build output includes compiled editor CSS.

## Milestone 10: WordPress.org readiness

### Tasks

Create `readme.txt` with:

```text
=== Equation Editor ===
Contributors:
Tags: equation, math, latex, mathml, katex, block
Requires at least: 6.3
Tested up to:
Requires PHP: 8.0
Stable tag: 0.1.0
License: GPL-2.0-or-later
License URI: https://www.gnu.org/licenses/gpl-2.0.html

== Description ==

== Installation ==

== Frequently Asked Questions ==

== Screenshots ==

== Changelog ==

== Upgrade Notice ==
```

Add screenshots or placeholders under:

```text
assets/screenshots/
```

Ensure release ZIP excludes:

```text
node_modules/
.git/
docs/reference/
tests artifacts that should not ship
```

Confirm:

```bash
npm run plugin-zip
```

### Acceptance criteria

- Plugin ZIP can be generated.
- Plugin ZIP contains built assets.
- Plugin ZIP does not contain `node_modules`.
- Plugin ZIP does not depend on external services.
- Plugin is ready for WordPress.org review preparation.

## Milestone 11: Tests and QA

### Manual QA

Test in WordPress 6.3+:

- Activate plugin.
- Insert Equation block.
- Type equation in MathLive.
- Use symbols from every tab.
- Save and reload.
- Confirm LaTeX persists.
- Confirm MathML persists.
- Confirm frontend output works.
- Confirm alignment works left, center, and right.
- Insert inline equation in Paragraph.
- Insert inline equation in Heading.
- Insert inline equation in List item.
- Insert inline equation in Table cell.
- Save and reload.
- Confirm inline equations persist.
- Confirm frontend inline rendering works.

Test fallback behavior:

- Simulate WordPress without built-in math support.
- Confirm KaTeX fallback is enqueued only when needed.
- Confirm standalone equations render.
- Confirm inline equations render.

Security QA:

- Attempt unsafe MathML attributes.
- Attempt event handler attributes.
- Attempt script/style injection.
- Confirm unsafe markup is removed.
- Confirm users without `unfiltered_html` can still save valid equations.

### Automated test candidates

Add unit tests where practical for:

- `equation_editor_has_core_math_support()`
- `equation_editor_allowed_mathml_tags()`
- `equation_editor_sanitize_mathml()`
- inline equation detection
- fallback asset enqueue decisions

Add e2e tests where practical for:

- block insertion
- MathLive editing
- symbol insertion
- alignment
- inline equation insertion
- save and reload

## Final definition of done

The task is complete when:

- Plugin activates on WordPress 6.3+ and PHP 8.0+.
- `equation-editor/equation` block exists.
- `equation-editor/inline-equation` rich-text format exists.
- MathLive powers block and inline editing.
- The symbol palette matches the uploaded screenshots.
- LaTeX is always the editable source.
- MathML is always generated output.
- WordPress built-in math display is used when available.
- KaTeX fallback is used when WordPress built-in math display is unavailable.
- KaTeX and MathLive are bundled locally.
- SCSS is used for editor UI.
- No CDN assets are loaded.
- No custom macros are supported.
- No equation numbering or cross-references are included.
- Any user who can edit posts can author equations.
- Output is escaped and sanitized.
- `npm run build` passes.
- Lint commands pass or documented failures are explained.
- `npm run plugin-zip` works.
- Plugin is WordPress.org-ready.
