/**
 * Entry point for the equation block: registers the block type with WordPress
 * using its metadata and the edit/save implementations (side-effect module).
 */

import { registerBlockType } from '@wordpress/blocks';
import metadata from './block.json';
import Edit from './edit';
import save from './save';

import 'mathlive/fonts.css';
import 'mathlive/static.css';

import './editor.scss';
import './style.scss';

import { Icon, math } from '@wordpress/icons';

registerBlockType( metadata.name, {
	icon: math,
	edit: Edit,
	save,
} );
