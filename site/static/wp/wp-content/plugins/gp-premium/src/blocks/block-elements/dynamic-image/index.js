import getIcon from '../../../utils/get-icon';
import edit from './edit';

import {
	__,
} from '@wordpress/i18n';

import {
	registerBlockType,
} from '@wordpress/blocks';

/**
 * Register our Headline block.
 *
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType( 'generatepress/dynamic-image', {
	title: __( 'Dynamic Image', 'gp-premium' ),
	description: __( 'Displays a dynamic image from your chosen source.', 'gp-premium' ),
	icon: getIcon( 'generatepress' ),
	category: 'generatepress',
	keywords: [
		__( 'image' ),
		__( 'dynamic image' ),
		__( 'gp' ),
		__( 'generate' ),
	],
	supports: {
		anchor: false,
		className: false,
		customClassName: false,
	},
	attributes: {
		imageType: {
			type: 'string',
			default: '',
		},
		imageSource: {
			type: 'string',
			default: 'current-post',
		},
		gpDynamicSourceInSameTerm: {
			type: 'boolean',
			default: false,
		},
		gpDynamicSourceInSameTermTaxonomy: {
			type: 'string',
			default: 'category',
		},
		imageSize: {
			type: 'string',
			default: 'full',
		},
		linkTo: {
			type: 'string',
			default: '',
		},
		linkToCustomField: {
			type: 'string',
			default: '',
		},
		imageWidth: {
			type: 'number',
			default: null,
		},
		imageHeight: {
			type: 'number',
			default: null,
		},
		avatarSize: {
			type: 'number',
			default: 30,
		},
		avatarRounded: {
			type: 'boolean',
			default: false,
		},
	},
	edit,
	save: () => {
		return null;
	},
} );
