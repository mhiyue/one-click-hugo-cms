import addToCSS from '../../../utils/add-to-css';
import getIcon from '../../../utils/get-icon';
import './editor.scss';

/**
 * WordPress Dependencies
 */
import {
	__,
} from '@wordpress/i18n';

import {
	addFilter,
	applyFilters,
	currentFilter,
} from '@wordpress/hooks';

import {
	Fragment,
} from '@wordpress/element';

import {
	ToggleControl,
	SelectControl,
	TextControl,
	ToolbarGroup,
	ToolbarButton,
	Dropdown,
	BaseControl,
} from '@wordpress/components';

import {
	createHigherOrderComponent,
} from '@wordpress/compose';

import {
	BlockControls,
} from '@wordpress/block-editor';

const allowedBlocks = [ 'generateblocks/container' ];

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
			gpDynamicImageBg: {
				type: 'string',
				default: '',
			},
			gpUseFallbackImageBg: {
				type: 'boolean',
				default: false,
			},
			gpDynamicImageCustomField: {
				type: 'string',
				default: '',
			},
			gpInlinePostMeta: {
				type: 'boolean',
				default: false,
			},
			gpInlinePostMetaJustify: {
				type: 'string',
				default: '',
			},
			gpInlinePostMetaJustifyTablet: {
				type: 'string',
				default: '',
			},
			gpInlinePostMetaJustifyMobile: {
				type: 'string',
				default: '',
			},
			gpDynamicLinkType: {
				type: 'string',
				default: '',
			},
			gpDynamicLinkCustomField: {
				type: 'string',
				default: '',
			},
			gpDynamicSource: {
				type: 'string',
				default: 'current-post',
			},
			gpRemoveContainerCondition: {
				type: 'string',
				default: '',
			},
			gpAdjacentPostInSameTerm: {
				type: 'boolean',
				default: false,
			},
			gpAdjacentPostInSameTermTax: {
				type: 'string',
				default: 'category',
			},
		} );
	}

	return settings;
}

function addControls( output, id, props, state ) {
	if ( ! gpPremiumBlockElements.isBlockElement ) {
		return output;
	}

	if ( 'containerLayout' !== id && 'containerGridLayout' !== id ) {
		return output;
	}

	const getDeviceType = () => {
		let device = 'Desktop';

		if ( 'undefined' !== typeof props.deviceType && props.deviceType ) {
			device = props.deviceType;
		} else if ( 'undefined' !== typeof state.selectedDevice && state.selectedDevice ) {
			device = state.selectedDevice;
		}

		return device;
	};

	const {
		attributes,
		setAttributes,
	} = props;

	const {
		gpInlinePostMeta,
		gpInlinePostMetaJustify,
		gpInlinePostMetaJustifyTablet,
		gpInlinePostMetaJustifyMobile,
		gpRemoveContainerCondition,
		gpAdjacentPostInSameTerm,
		gpAdjacentPostInSameTermTax,
	} = attributes;

	const meta = wp.data.select( 'core/editor' ).getEditedPostAttribute( 'meta' );

	return (
		<Fragment>
			{ 'Desktop' === getDeviceType() &&
				<ToggleControl
					label={ __( 'Inline post meta items', 'gp-premium' ) }
					checked={ !! gpInlinePostMeta }
					onChange={ ( value ) => {
						setAttributes( {
							gpInlinePostMeta: value,
						} );
					} }
				/>
			}

			{ !! gpInlinePostMeta &&
				<Fragment>
					{ 'Desktop' === getDeviceType() &&
						<SelectControl
							label={ __( 'Inline alignment', 'gp-premium' ) }
							value={ gpInlinePostMetaJustify }
							options={ [
								{ label: __( 'Choose…', 'gp-premium' ), value: '' },
								{ label: __( 'Left', 'gp-premium' ), value: 'flex-start' },
								{ label: __( 'Center', 'gp-premium' ), value: 'center' },
								{ label: __( 'Right', 'gp-premium' ), value: 'flex-end' },
								{ label: __( 'Space between', 'gp-premium' ), value: 'space-between' },
							] }
							onChange={ ( value ) => {
								setAttributes( {
									gpInlinePostMetaJustify: value,
								} );
							} }
						/>
					}

					{ 'Tablet' === getDeviceType() &&
						<SelectControl
							label={ __( 'Inline alignment', 'gp-premium' ) }
							value={ gpInlinePostMetaJustifyTablet }
							options={ [
								{ label: __( 'Choose…', 'gp-premium' ), value: '' },
								{ label: __( 'Left', 'gp-premium' ), value: 'flex-start' },
								{ label: __( 'Center', 'gp-premium' ), value: 'center' },
								{ label: __( 'Right', 'gp-premium' ), value: 'flex-end' },
								{ label: __( 'Space between', 'gp-premium' ), value: 'space-between' },
							] }
							onChange={ ( value ) => {
								setAttributes( {
									gpInlinePostMetaJustifyTablet: value,
								} );
							} }
						/>
					}

					{ 'Mobile' === getDeviceType() &&
						<SelectControl
							label={ __( 'Inline alignment', 'gp-premium' ) }
							value={ gpInlinePostMetaJustifyMobile }
							options={ [
								{ label: __( 'Choose…', 'gp-premium' ), value: '' },
								{ label: __( 'Left', 'gp-premium' ), value: 'flex-start' },
								{ label: __( 'Center', 'gp-premium' ), value: 'center' },
								{ label: __( 'Right', 'gp-premium' ), value: 'flex-end' },
								{ label: __( 'Space between', 'gp-premium' ), value: 'space-between' },
							] }
							onChange={ ( value ) => {
								setAttributes( {
									gpInlinePostMetaJustifyMobile: value,
								} );
							} }
						/>
					}
				</Fragment>
			}

			{ 'post-navigation-template' === meta._generate_block_type &&
				<Fragment>
					<SelectControl
						label={ __( 'Remove Container condition', 'gp-premium' ) }
						value={ gpRemoveContainerCondition }
						options={ [
							{ label: __( 'Choose…', 'gp-premium' ), value: '' },
							{ label: __( 'No next post', 'gp-premium' ), value: 'no-next-post' },
							{ label: __( 'No previous post', 'gp-premium' ), value: 'no-previous-post' },
						] }
						onChange={ ( value ) => {
							setAttributes( {
								gpRemoveContainerCondition: value,
							} );
						} }
					/>

					{ ( 'no-next-post' === gpRemoveContainerCondition || 'no-previous-post' === gpRemoveContainerCondition ) &&
						<Fragment>
							<ToggleControl
								label={ __( 'In same term', 'gp-premium' ) }
								help={ __( 'Check for posts with the same term as the current post.', 'gp-premim' ) }
								checked={ !! gpAdjacentPostInSameTerm }
								onChange={ ( value ) => {
									setAttributes( {
										gpAdjacentPostInSameTerm: value,
									} );
								} }
							/>

							{ !! gpAdjacentPostInSameTerm &&
								<TextControl
									label={ __( 'Taxonomy', 'gp-premium' ) }
									help={ __( 'The taxonomy to check if in the same term.', 'gp-premim' ) }
									type="text"
									value={ gpAdjacentPostInSameTermTax }
									onChange={ ( value ) => {
										setAttributes( {
											gpAdjacentPostInSameTermTax: value,
										} );
									} }
								/>
							}
						</Fragment>
					}
				</Fragment>
			}

			{ output }
		</Fragment>
	);
}

/**
 * Add controls to the Container block toolbar.
 *
 * @param {Function} BlockEdit Block edit component.
 *
 * @return {Function} BlockEdit Modified block edit component.
 */
const addDynamicContainerBgToolbar = createHigherOrderComponent( ( BlockEdit ) => {
	return ( props ) => {
		const {
			name,
			attributes,
			isSelected,
			setAttributes,
		} = props;

		const {
			gpDynamicImageBg,
			gpDynamicImageCustomField,
			gpUseFallbackImageBg,
			bgImage,
			gpDynamicLinkType,
			gpDynamicLinkCustomField,
			gpDynamicSource,
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
									contentClassName="gpp-dynamic-container-bg-dropdown"
									popoverProps={ POPOVER_PROPS }
									renderToggle={ ( { isOpen, onToggle } ) => (
										<ToolbarButton
											icon={ getIcon( 'dynamic' ) }
											label={ __( 'Dynamic options', 'gp-premium' ) }
											onClick={ onToggle }
											aria-expanded={ isOpen }
											isPressed={ !! gpDynamicImageBg || !! gpDynamicLinkType }
										/>
									) }
									renderContent={ () => (
										<Fragment>
											<Fragment>
												<SelectControl
													label={ __( 'Dynamic Background Image', 'gp-premium' ) }
													value={ gpDynamicImageBg }
													options={ [
														{ label: __( 'None', 'gp-premium' ), value: '' },
														{ label: __( 'Featured image', 'gp-premium' ), value: 'featured-image' },
														{ label: __( 'Post meta', 'gp-premium' ), value: 'post-meta' },
														{ label: __( 'Term meta', 'gp-premium' ), value: 'term-meta' },
														{ label: __( 'User meta', 'gp-premium' ), value: 'user-meta' },
													] }
													onChange={ ( value ) => {
														setAttributes( {
															gpDynamicImageBg: value,
														} );
													} }
													disabled={ ! bgImage ? true : false }
													help={ ! bgImage ? __( 'Add a background image to this Container to make it dynamic.', 'gp-premium' ) : '' }
												/>

												{ ( 'post-meta' === gpDynamicImageBg || 'term-meta' === gpDynamicImageBg || 'user-meta' === gpDynamicImageBg ) &&
													<TextControl
														label={ __( 'Meta field name', 'gp-premium' ) }
														value={ gpDynamicImageCustomField }
														onChange={ ( value ) => {
															setAttributes( {
																gpDynamicImageCustomField: value,
															} );
														} }
													/>
												}

												{ '' !== gpDynamicImageBg &&
													<ToggleControl
														label={ __( 'Use fallback image', 'gp-premium' ) }
														checked={ !! gpUseFallbackImageBg }
														onChange={ ( value ) => {
															setAttributes( {
																gpUseFallbackImageBg: value,
															} );
														} }
													/>
												}
											</Fragment>

											{ gpPremiumBlockElements.isGenerateBlocksProActive &&
												<Fragment>
													<BaseControl
														className="gpp-button-dynamic-link-area"
													>
														<SelectControl
															label={ __( 'Dynamic Link', 'gp-premium' ) }
															value={ gpDynamicLinkType }
															options={ [
																{ label: __( 'Choose…', 'gp-premium' ), value: '' },
																{ label: __( 'Post', 'gp-premium' ), value: 'post' },
																{ label: __( 'Post meta', 'gp-premium' ), value: 'post-meta' },
															] }
															onChange={ ( value ) => {
																if ( value ) {
																	setAttributes( {
																		gpDynamicLinkType: value,
																		url: '#',
																	} );
																} else {
																	setAttributes( {
																		gpDynamicLinkType: value,
																		url: '',
																	} );
																}
															} }
														/>

														{ 'post-meta' === gpDynamicLinkType &&
															<TextControl
																label={ __( 'Meta field name', 'gp-premium' ) }
																type={ 'text' }
																value={ gpDynamicLinkCustomField }
																onChange={ ( value ) => {
																	setAttributes( {
																		gpDynamicLinkCustomField: value,
																	} );
																} }
															/>
														}
													</BaseControl>
												</Fragment>
											}

											{ ( gpDynamicImageBg || gpDynamicLinkType ) &&
												<SelectControl
													label={ __( 'Source', 'gp-premium' ) }
													value={ gpDynamicSource }
													options={ [
														{ label: __( 'Current post', 'gp-premium' ), value: 'current-post' },
														{ label: __( 'Next post', 'gp-premium' ), value: 'next-post' },
														{ label: __( 'Previous post', 'gp-premium' ), value: 'previous-post' },
													] }
													onChange={ ( value ) => {
														setAttributes( {
															gpDynamicSource: value,
														} );
													} }
												/>
											}
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
}, 'addDynamicContainerBgToolbar' );

function addCustomAttributes( blockHtmlAttributes, blockName, blockAttributes ) {
	if ( 'generateblocks/container' !== blockName ) {
		return blockHtmlAttributes;
	}

	if ( blockAttributes.gpInlinePostMeta ) {
		blockHtmlAttributes = Object.assign( blockHtmlAttributes, {
			className: blockHtmlAttributes.className + ' inline-post-meta-area',
		} );
	}

	return blockHtmlAttributes;
}

function addCSS( css, props, name ) {
	const allowedAreas = [ 'container' ];

	if ( ! allowedAreas.includes( name ) ) {
		return css;
	}

	const attributes = applyFilters( 'generateblocks.editor.cssAttrs', props.attributes, props );

	const {
		uniqueId,
		gpInlinePostMeta,
		gpInlinePostMetaJustify,
		gpInlinePostMetaJustifyTablet,
		gpInlinePostMetaJustifyMobile,
	} = attributes;

	if ( gpInlinePostMeta ) {
		addToCSS( css, '.gb-container-' + uniqueId + '.inline-post-meta-area > .gb-inside-container > .block-editor-inner-blocks > .block-editor-block-list__layout', {
			'justify-content': gpInlinePostMetaJustify,
		} );

		if ( 'generateblocks.editor.tabletCSS' === currentFilter() ) {
			addToCSS( css, '.gb-container-' + uniqueId + '.inline-post-meta-area > .gb-inside-container > .block-editor-inner-blocks > .block-editor-block-list__layout', {
				'justify-content': gpInlinePostMetaJustifyTablet,
			} );
		}

		if ( 'generateblocks.editor.mobileCSS' === currentFilter() ) {
			addToCSS( css, '.gb-container-' + uniqueId + '.inline-post-meta-area > .gb-inside-container > .block-editor-inner-blocks > .block-editor-block-list__layout', {
				'justify-content': gpInlinePostMetaJustifyMobile,
			} );
		}
	}

	return css;
}

addFilter(
	'blocks.registerBlockType',
	'gp-premium/dynamic-container/add-attributes',
	addAttributes
);

addFilter(
	'generateblocks.editor.controls',
	'gp-premium/dynamic-container/add-container-controls',
	addControls
);

addFilter(
	'editor.BlockEdit',
	'gp-premium/dynamic-container/toolbar',
	addDynamicContainerBgToolbar
);

addFilter(
	'generateblocks.frontend.htmlAttributes',
	'gp-premium/dynamic-container/add-html-attributes',
	addCustomAttributes
);

addFilter(
	'generateblocks.editor.mainCSS',
	'gp-premium/dynamic-container/add-main-css',
	addCSS
);

addFilter(
	'generateblocks.editor.tabletCSS',
	'gp-premium/dynamic-container/add-tablet-css',
	addCSS
);

addFilter(
	'generateblocks.editor.mobileCSS',
	'gp-premium/dynamic-container/add-mobile-css',
	addCSS
);
