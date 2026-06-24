=== Equation Editor ===
Contributors: eslin87
Tags: equation, math, latex, mathml, katex, block
Requires at least: 6.0
Tested up to: 7.0
Requires PHP: 8.0
Stable tag: 0.1.0
License: GPL-2.0-or-later
License URI: https://www.gnu.org/licenses/gpl-2.0.html

== Description ==

Equation Editor adds a MathLive-powered equation authoring experience to the WordPress block editor.

Use the standalone Equation block for display equations, or add inline equations inside rich text fields such as Paragraph, Heading, List, and Table cells. Equations use LaTeX as the editable source and generated MathML as the stored output.

When WordPress core math display support is available, Equation Editor renders sanitized MathML directly. On older WordPress versions, the plugin uses a locally bundled KaTeX fallback for targeted frontend rendering.

Features:

* Standalone Equation block.
* Inline equation rich-text format.
* MathLive WYSIWYG equation editing.
* Tabbed symbol palette for common math symbols.
* Left, center, and right alignment for standalone equations.
* Sanitized MathML output.
* Local KaTeX fallback without CDN assets.

Equation Editor does not add equation numbering, labels, cross-references, custom macros, tracking, or external service calls.

== Installation ==

1. Upload the plugin folder to `/wp-content/plugins/equation-editor/`.
2. If installing from source, run `npm install` and `npm run build`.
3. Activate Equation Editor from the Plugins screen in WordPress.
4. Insert the Equation block or use the Equation toolbar button in supported rich text fields.

== Frequently Asked Questions ==

= Does this plugin load scripts or styles from a CDN? =

No. MathLive, KaTeX, fonts, CSS, and JavaScript are bundled locally.

= Does this replace the WordPress core Math block? =

No. The Equation block and inline equation format remain separate from core math features.

= What is stored as the editable equation source? =

LaTeX is stored as the editable source. Generated MathML is stored as the display output.

= What happens when WordPress does not provide built-in math display support? =

Equation Editor enqueues its locally bundled KaTeX fallback only on frontend pages that need equation rendering.

== Screenshots ==

1. Standalone Equation block in the editor.
2. Inline equation popover with MathLive editing.
3. Tabbed symbol palette.
4. Frontend equation rendering with fallback support.

== Changelog ==

= 0.1.0 =
Initial release.

== Upgrade Notice ==

= 0.1.0 =
Initial release.
