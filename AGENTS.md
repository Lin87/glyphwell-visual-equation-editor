# AGENTS.md

## Project

This repository contains a WordPress plugin named **Equation Editor**.

The plugin adds:

1. A standalone block editor block named `equation-editor/equation`.
2. An inline equation rich-text format named `equation-editor/inline-equation`.
3. A MathLive-powered WYSIWYG math editor.
4. A tabbed symbol palette matching the provided reference screenshots exactly.
5. Frontend equation rendering using WordPress built-in math support when available.
6. A locally bundled KaTeX fallback when WordPress built-in math display is unavailable.

## Minimum platform requirements

- WordPress: 6.3+
- PHP: 8.0+
- Node: current LTS-compatible version
- Build system: npm + webpack through `@wordpress/scripts`

## Required dependencies

Use `package.json` for dependency management.

Required runtime dependencies:

- `mathlive`
- `katex`

Required development dependencies:

- `@wordpress/scripts`
- `postcss`

Do not load MathLive, KaTeX, fonts, CSS, or JavaScript from a CDN.

## WordPress plugin rules

Use a common WordPress plugin structure:

```text
equation-editor/
├── equation-editor.php
├── readme.txt
├── package.json
├── package-lock.json
├── webpack.config.js
├── includes/
├── src/
├── build/
├── assets/
├── docs/
└── tests/
```

Use `block.json` metadata for the standalone block.

Register the block server-side with `register_block_type_from_metadata()`.

Use dynamic block rendering for the standalone equation block.

Use WordPress Coding Standards for PHP.

Prefix all plugin PHP functions with `equation_editor_`.

Do not introduce Composer unless specifically requested.

Do not add localization wrappers or translation files in this first release unless explicitly requested later.

## Core product requirements

### Standalone Equation block

Create a block named:

```text
equation-editor/equation
```

The block must:

- Appear in the block inserter as **Equation**.
- Use MathLive for WYSIWYG math editing.
- Store LaTeX as the editable source.
- Generate and store MathML from the LaTeX.
- Support left, center, and right text alignment.
- Use a custom toolbar control for alignment.
- Disable raw HTML editing for the block.
- Remain separate from WordPress core’s Math block.
- Not create transforms to or from `core/math` in the first release.
- Not support equation numbering, labels, or cross-references in the first release.
- Not support custom macros in the first release.

Recommended block attributes:

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

### Inline equation formatting

Create a rich-text inline format named:

```text
equation-editor/inline-equation
```

The inline equation format must:

- Be available in rich text fields such as Paragraph, Heading, List, and Table cells.
- Use a toolbar button labeled **Equation**.
- Open a popover containing the same MathLive editor and symbol palette used by the standalone block.
- Store LaTeX in a data attribute.
- Store generated MathML as the inline object’s inner HTML.
- Behave like a single inline equation token as much as possible.
- Remain separate from WordPress core’s Math format.

Recommended inline markup:

```html
<math
	class="equation-editor-inline"
	data-equation-editor-latex="x^2 + y^2 = z^2"
	display="inline"
>
	<!-- generated MathML children -->
</math>
```

### Math source and output rules

LaTeX is always the editable source.

MathML is always generated output.

The editor must update both `latex` and `mathML` whenever the equation changes.

Use MathLive to generate MathML where possible.

Do not add custom macro support in the first release.

## Rendering strategy

KaTeX is the single renderer for every surface — the editor preview, the
standalone block, and inline equations — regardless of the WordPress version or
whether the core math block is available. Equations are always rendered from the
saved LaTeX, so any styling captured in the LaTeX (e.g. `\textcolor`,
`\colorbox`) carries through to the published page.

- Enqueue the locally bundled KaTeX assets on any post that contains saved
  equation markup (detected by class plus the `data-equation-editor-latex`
  attribute); do not load them on pages without equations.
- Render standalone block equations and inline equations from the
  `data-equation-editor-latex` attribute.
- The editor preview renders the same LaTeX with the same KaTeX options so it
  matches the frontend exactly.
- Use targeted rendering only. Do not use KaTeX auto-render across the full page.

Render targets:

```text
.equation-editor__fallback
.equation-editor__mathml[data-equation-editor-latex]
.equation-editor-inline[data-equation-editor-latex]
```

The saved markup still includes a serialized MathML representation for
backwards compatibility, but KaTeX renders over it from the LaTeX.

Recommended KaTeX options:

```js
{
	displayMode: true or false,
	throwOnError: false,
	output: 'htmlAndMathml',
	trust: false,
	maxSize: 20,
	maxExpand: 1000
}
```

## Security requirements

Any user who can edit a post or custom post type can create equations.

Do not add extra capability checks for equation authoring.

Do not rely on `unfiltered_html`.

All output must be escaped or sanitized.

Required escaping and sanitization:

- Escape LaTeX in HTML attributes with `esc_attr()`.
- Escape fallback text with `esc_html()`.
- Sanitize MathML with `wp_kses()`.
- Add a MathML-specific KSES allowlist.
- Add a KSES allowlist for the plugin’s inline equation attributes.
- Do not allow event handler attributes.
- Do not allow `script`, `style`, `href`, `src`, or external resource attributes in MathML.
- Use KaTeX with `trust: false`.

Create sanitization helpers in:

```text
includes/sanitization.php
```

Required helper functions:

```php
equation_editor_allowed_mathml_tags()
equation_editor_sanitize_mathml( string $mathml ): string
equation_editor_extend_allowed_post_tags( array $tags, string $context ): array
```

## Symbol palette requirements

The symbol palette must exactly match the provided screenshots.

Reference images are located at:

```text
docs/reference/symbol-palette/basic.png
docs/reference/symbol-palette/greek.png
docs/reference/symbol-palette/operators.png
docs/reference/symbol-palette/relationships.png
docs/reference/symbol-palette/arrows.png
docs/reference/symbol-palette/delimiters.png
docs/reference/symbol-palette/misc.png
```

Zoomed reference images are also available in:

```text
docs/reference/symbol-palette/zoom/
```

Create symbol data in:

```text
src/data/symbols.js
```

Use a data-driven structure.

Recommended shape:

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

The same symbol palette component must be reused by:

- the standalone equation block
- the inline equation popover

Required groups, in this exact order:

1. Basic
2. Greek
3. Operators
4. Relationships
5. Arrows
6. Delimiters
7. Misc

Use the screenshot visual order as the source of truth.

When a symbol has multiple valid LaTeX aliases, choose the standard KaTeX-supported macro that renders closest to the screenshot.

## Editor CSS requirements

Use SCSS for editor UI styling.

Editor styles should cover:

- symbol palette tabs
- symbol buttons
- popovers
- editor layout
- preview wrappers

Do not save editor-only styling classes into post content.

Frontend markup must use stable plugin classes, for example:

```text
equation-editor-equation
equation-editor-inline
equation-editor__fallback
equation-editor__mathml
```

## Build requirements

Use `@wordpress/scripts`.

Use `webpack.config.js` to extend the default webpack setup only where needed.

Required npm scripts:

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

## Asset loading rules

Editor:

- Load MathLive only in the block editor.
- Load the symbol palette only in editor contexts.
- Load editor CSS only in editor contexts.

Frontend:

- Register KaTeX fallback assets.
- Enqueue KaTeX fallback assets only when needed.
- For standalone blocks, enqueue fallback assets from the dynamic render path.
- For inline equations, scan post content for `equation-editor-inline` and enqueue fallback assets when WordPress built-in math display is unavailable.

## WordPress.org readiness

Prepare the plugin for WordPress.org submission.

Include:

- valid plugin header
- `readme.txt`
- `Requires at least: 6.3`
- `Requires PHP: 8.0`
- GPL-compatible license declaration
- no CDN assets
- no tracking
- no external service calls
- no bundled `node_modules`
- built files in `build/`
- source files in `src/`
- screenshots in `assets/` or documented screenshot locations
- `npm run plugin-zip` support

## Commands to run before completion

Run these when available:

```bash
npm install
npm run build
npm run lint:js
npm run lint:css
```

Run tests when available:

```bash
npm run test:unit
npm run test:e2e
```

If a command cannot run in the current environment, document the reason in the final response.

## Implementation discipline

Work in small, reviewable steps.

Do not implement unrelated features.

Do not rename the plugin.

Do not change the namespace.

Do not add core Math block transforms.

Do not add equation numbering.

Do not add custom macros.

Do not use CDN assets.

Do not skip sanitization.

Do not output raw stored MathML.

Do not output raw LaTeX into HTML.
