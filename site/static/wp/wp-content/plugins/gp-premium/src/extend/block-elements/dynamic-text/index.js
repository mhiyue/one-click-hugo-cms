import DynamicTextRender from '../../../components/dynamic-text-render';
import DynamicTextPicker from '../../../components/dynamic-text-picker';
import getIcon from '../../../utils/get-icon';
import addToCSS from '../../../utils/add-to-css';
import './editor.scss';

/**
 * WordPress Dependencies
 */

import {
	addFilter,
} from '@wordpress/hooks';

import {
	__,
} from '@wordpress/i18n';

import {
	createHigherOrderComponent,
} from '@wordpress/compose';

import {
	Fragment,
} from '@wordpress/element';

import {
	ToolbarGroup,
	Dropdown,
	ToolbarButton,
} from '@wordpress/components';

import {
	BlockControls,
} from '@wordpress/block-editor';

const allowedBlocks = [ 'generateblocks/headline', 'generateblocks/button' ];

/**
 * Add custom attribute for mobile visibility.
 *
 * @param {Object} settings Settings for the block.
 *
 * @return {Object} settings Modified settings.
 */
function addAttributes( settings ) {
	if ( ! allowedBlocks.includes( settings.name ) ) {
		return settings;
	}

	if ( typeof settings.attributes !== 'undefined' ) {
		settings.attributes = Object.assign( settings.attributes, {
			gpDynamicTextType: {
				type: 'string',
				default: '',
			},
			gpDynamicLinkType: {
				type: 'string',
				default: '',
			},
			gpDynamicTextReplace: {
				type: 'string',
				default: '',
			},
			gpDynamicSource: {
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
			gpDynamicTextTaxonomy: {
				type: 'string',
				default: '',
			},
			gpDynamicTextTaxonomySeparator: {
				type: 'string',
				default: ', ',
			},
			gpDynamicTextCustomField: {
				type: 'string',
				default: '',
			},
			gpDynamicTextBefore: {
				type: 'string',
				default: '',
			},
			gpDynamicUpdatedDateBefore: {
				type: 'string',
				default: '',
			},
			gpDynamicDateUpdated: {
				type: 'boolean',
				default: false,
			},
			gpDynamicNoCommentsText: {
				type: 'string',
				default: __( 'No Comments', 'gp-premium' ),
			},
			gpDynamicSingleCommentText: {
				type: 'string',
				default: __( '1 Comment', 'gp-premium' ),
			},
			gpDynamicMultipleCommentsText: {
				type: 'string',
				default: __( '% Comments', 'gp-premium' ),
			},
			gpDynamicLinkCustomField: {
				type: 'string',
				default: '',
			},
			gpDynamicDateType: {
				type: 'string',
				default: 'published-date',
			},
		} );
	}

	return settings;
}

const withClientIdClassName = createHigherOrderComponent( ( BlockListBlock ) => {
	return ( props ) => {
		if ( ! allowedBlocks.includes( props.name ) ) {
			return <BlockListBlock { ...props } />;
		}

		return (
			<Fragment>
				<DynamicTextRender { ...props } />
				<BlockListBlock { ...props } />
			</Fragment>
		);
	};
}, 'withClientIdClassName' );

/**
 * Add controls to the Container block toolbar.
 *
 * @param {Function} BlockEdit Block edit component.
 *
 * @return {Function} BlockEdit Modified block edit component.
 */
const addDynamicHeadlineTextToolbar = createHigherOrderComponent( ( BlockEdit ) => {
	return ( props ) => {
		const {
			name,
			attributes,
			isSelected,
		} = props;

		const {
			gpDynamicTextType,
			gpDynamicLinkType,
		} = attributes;

		const POPOVER_PROPS = {
			className: 'block-editor-block-settings-menu__popover',
			position: 'bottom right',
		};

		return (
			<Fragment>
				<BlockEdit { ...props } />

				{ isSelected && allowedBlocks.includes( name ) &&
					<Fragment>
						<BlockControls>
							<ToolbarGroup>
								<Dropdown
									contentClassName="gpp-dynamic-headline-text-dropdown"
									popoverProps={ POPOVER_PROPS }
									renderToggle={ ( { isOpen, onToggle } ) => (
										<ToolbarButton
											icon={ getIcon( 'dynamic' ) }
											label={ __( 'Dynamic options', 'gp-premium' ) }
											onClick={ onToggle }
											aria-expanded={ isOpen }
											isPressed={ !! gpDynamicTextType || !! gpDynamicLinkType }
										/>
									) }
									renderContent={ () => (
										<Fragment>
											<DynamicTextPicker { ...props } />
										</Fragment>
									) }
								/>
							</ToolbarGroup>
						</BlockControls>
					</Fragment>
				}
			</Fragment>
		);
	};
}, 'addDynamicHeadlineTextToolbar' );

function disableHeadlineFormatting( disable, props ) {
	if ( 'undefined' !== typeof props.attributes.gpDynamicTextType && props.attributes.gpDynamicTextType ) {
		return true;
	}

	return disable;
}

function addCSS( css, props, name ) {
	const allowedAreas = [ 'headline' ];

	if ( ! allowedAreas.includes( name ) ) {
		return css;
	}

	const {
		uniqueId,
		gpDynamicTextBefore,
		gpDynamicTextType,
	} = props.attributes;

	if ( !! gpDynamicTextType && !! gpDynamicTextBefore ) {
		addToCSS( css, '.gb-headline-' + uniqueId + ' .gb-headline-text:before, .gb-headline-' + uniqueId + '.gb-headline-text:before', {
			content: '"' + gpDynamicTextBefore + '"',
		} );
	}

	return css;
}

addFilter(
	'blocks.registerBlockType',
	'gp-premium/dynamic-text/add-attributes',
	addAttributes
);

addFilter(
	'editor.BlockListBlock',
	'my-plugin/with-client-id-class-name',
	withClientIdClassName
);

addFilter(
	'editor.BlockEdit',
	'gp-premium/dynamic-headline/toolbar',
	addDynamicHeadlineTextToolbar
);

addFilter(
	'generateblocks.editor.headlineDisableFormatting',
	'gp-premium/dynamic-headline/disable-headline-formatting',
	disableHeadlineFormatting
);

addFilter(
	'generateblocks.editor.mainCSS',
	'gp-premium/dynamic-headline/headline-css',
	addCSS
);

