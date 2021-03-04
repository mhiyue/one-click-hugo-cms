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
registerBlockType( 'generatepress/dynamic-content', {
	title: __( 'Dynamic Content', 'gp-premium' ),
	description: __( 'Displays dynamic content based on your chosen source.', 'gp-premium' ),
	icon: getIcon( 'generatepress' ),
	category: 'generatepress',
	keywords: [
		__( 'content' ),
		__( 'dynamic content' ),
		__( 'gp' ),
		__( 'generate' ),
	],
	supports: {
		anchor: false,
		className: false,
		customClassName: false,
	},
	attributes: {
		contentType: {
			type: 'string',
			default: '',
		},
		excerptLength: {
			type: 'number',
			default: gpPremiumBlockElements.excerptLength,
		},
		useThemeMoreLink: {
			type: 'boolean',
			default: true,
		},
		customMoreLink: {
			type: 'string',
			default: '',
		},
	},
	edit,
	save: () => {
		return null;
	},
} );
