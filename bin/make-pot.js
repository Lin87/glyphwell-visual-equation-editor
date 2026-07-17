#!/usr/bin/env node
/**
 * Generates languages/glyphwell.pot — the translation template for the
 * plugin's user-facing strings.
 *
 * All translatable strings live in the JS/JSX under src/ (wrapped in the
 * WordPress i18n functions `__`, `_x`, and friends) plus the block
 * title/description in block.json. We extract them with gettext-extractor,
 * which uses the TypeScript parser and understands JSX, so it works without
 * WP-CLI. The block.json strings are added explicitly because gettext-extractor
 * only reads code, not metadata JSON.
 *
 * For a WP.org-grade catalog that also scans PHP in one pass, WP-CLI's
 * `wp i18n make-pot . languages/glyphwell.pot --domain=glyphwell`
 * is the canonical alternative where WP-CLI is available.
 *
 * Usage: `npm run make-pot`.
 */

const fs = require( 'fs' );
const path = require( 'path' );
const { GettextExtractor, JsExtractors } = require( 'gettext-extractor' );

const ROOT = path.resolve( __dirname, '..' );
const TEXT_DOMAIN = 'glyphwell';
const OUTPUT = path.join( ROOT, 'languages', `${ TEXT_DOMAIN }.pot` );
const BLOCK_JSON = path.join( ROOT, 'src', 'blocks', 'equation', 'block.json' );

// Run relative to the plugin root so .pot source references are project-relative
// (e.g. src/blocks/equation/edit.js) and stable across machines.
process.chdir( ROOT );

// Only keep `translators:` developer comments, matching WordPress convention.
// The capture group spans the whole note so the "translators:" prefix and its
// text are both preserved in the .pot.
const comments = {
	otherLineLeading: true,
	sameLineLeading: true,
	sameLineTrailing: true,
	regex: /(translators:.*)/,
};

const extractor = new GettextExtractor();

extractor
	.createJsParser( [
		JsExtractors.callExpression( '__', {
			arguments: { text: 0 },
			comments,
		} ),
		JsExtractors.callExpression( '_x', {
			arguments: { text: 0, context: 1 },
			comments,
		} ),
		JsExtractors.callExpression( '_n', {
			arguments: { text: 0, textPlural: 1 },
			comments,
		} ),
		JsExtractors.callExpression( '_nx', {
			arguments: { text: 0, textPlural: 1, context: 3 },
			comments,
		} ),
	] )
	// TypeScript's parser reads JSX from `.js` files by default, so no explicit
	// script kind is needed here.
	.parseFilesGlob( 'src/**/*.js' );

// block.json title/description are localized at runtime via the block's
// textdomain, but gettext-extractor does not read JSON, so add them by hand.
const blockMeta = JSON.parse( fs.readFileSync( BLOCK_JSON, 'utf8' ) );
for ( const key of [ 'title', 'description' ] ) {
	if ( blockMeta[ key ] ) {
		extractor.addMessage( {
			text: blockMeta[ key ],
			references: [ 'src/blocks/equation/block.json' ],
		} );
	}
}

const headers = {
	'Project-Id-Version': 'Glyphwell - Visual Equation Editor 0.1.0',
	'Report-Msgid-Bugs-To': 'https://profiles.wordpress.org/eslin87/',
	'MIME-Version': '1.0',
	'Content-Type': 'text/plain; charset=UTF-8',
	'Content-Transfer-Encoding': '8bit',
	'X-Domain': TEXT_DOMAIN,
};

fs.mkdirSync( path.dirname( OUTPUT ), { recursive: true } );
extractor.savePotFile( OUTPUT, headers );
extractor.printStats();

// eslint-disable-next-line no-console
console.log( `\nWrote ${ path.relative( ROOT, OUTPUT ) }` );
