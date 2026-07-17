/**
 * Shared identifiers that form the contract between the editor scripts which
 * emit equation markup and the PHP that later detects and sanitizes it.
 *
 * Keep these values in sync with their PHP counterparts in
 * `includes/constants.php`; a drift in either side silently breaks fallback
 * detection or sanitization.
 */

/** Block type name for the standalone equation block. */
export const BLOCK_NAME = 'glyphwell/equation';

/** Rich-text format name for inline equations. */
export const INLINE_FORMAT_NAME = 'glyphwell/inline-equation';

/** Data attribute holding the raw LaTeX source on saved equation markup. */
export const LATEX_DATA_ATTRIBUTE = 'data-glyphwell-latex';

/** CSS class marking a block-level MathML equation. */
export const MATHML_CLASS = 'glyphwell__mathml';

/** CSS class marking an inline equation. */
export const INLINE_CLASS = 'glyphwell-inline';

/** CSS class marking a LaTeX placeholder rendered by the KaTeX renderer. */
export const FALLBACK_CLASS = 'glyphwell__fallback';
