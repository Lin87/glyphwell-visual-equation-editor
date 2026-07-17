const path = require( 'path' );
const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );

const defaultEntry =
	typeof defaultConfig.entry === 'function'
		? defaultConfig.entry()
		: defaultConfig.entry;

module.exports = {
	...defaultConfig,
	entry: {
		...defaultEntry,
		'formats/inline-equation/index': path.resolve(
			process.cwd(),
			'src/formats/inline-equation/index.js'
		),
		'frontend/katex': path.resolve(
			process.cwd(),
			'src/frontend/katex.js'
		),
	},
	module: {
		...defaultConfig.module,
		rules: [
			...defaultConfig.module.rules,
			{
				test: /\.(woff2?|ttf|otf|eot)$/i,
				type: 'asset/resource',
				generator: {
					filename: 'fonts/[name].[contenthash][ext]',
				},
			},
		],
	},
};
