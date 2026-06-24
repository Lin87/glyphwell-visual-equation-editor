/**
 * Entry point for the equation block: registers the block type with WordPress
 * using its metadata and the edit/save implementations (side-effect module).
 */

import { registerBlockType } from '@wordpress/blocks';

import 'mathlive/fonts.css';
import 'mathlive/static.css';

import metadata from './block.json';
import Edit from './edit';
import save from './save';
import './editor.scss';
import './style.scss';

registerBlockType( metadata.name, {
	edit: Edit,
	save,
} );
