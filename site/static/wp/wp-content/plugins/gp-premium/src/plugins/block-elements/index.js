import LazyLoad from 'react-lazyload';
import UnitPicker from '../../components/unit-picker';
import getIcon from '../../utils/get-icon';
import SelectSearch from 'react-select-search';
import './editor.scss';
import postNavigationTemplates from './templates/post-navigation';
import postMetaTemplates from './templates/post-meta';
import siteFooterTemplates from './templates/site-footer';
import contentTemplates from './templates/content-template';
import archiveNavigationTemplates from './templates/archive-navigation';
import pageHeroTemplates from './templates/page-hero';

import {
	__,
} from '@wordpress/i18n';

import {
	registerPlugin,
} from '@wordpress/plugins';

import {
	PluginDocumentSettingPanel,
} from '@wordpress/edit-post';

import {
	withSelect,
	withDispatch,
} from '@wordpress/data';

import {
	TextControl,
	SelectControl,
	Notice,
	BaseControl,
	ToggleControl,
	PanelBody,
} from '@wordpress/components';

import {
	compose,
} from '@wordpress/compose';

import {
	Component,
	Fragment,
} from '@wordpress/element';

import {
	parse,
} from '@wordpress/blocks';

class BlockElementSettings extends Component {
	constructor() {
		super( ...arguments );

		this.getWidth = this.getWidth.bind( this );

		this.state = {
			installingPlugin: false,
			pluginInstalled: false,
		};
	}

	componentDidMount() {
		const style = document.createElement( 'style' );
		style.id = 'gp-block-elements-css';
		document.head.appendChild( style );

		style.innerHTML = `html {--gp-block-element-width: ${ this.getWidth().width }${ this.getWidth().unit }}`;

		if ( 'undefined' !== wp.data.select( 'core/edit-post' ).getPreference( 'panels' )[ 'generatepress-block-element/generatepress-block-element' ] ) {
			const blockPanel = wp.data.select( 'core/edit-post' ).getPreference( 'panels' )[ 'generatepress-block-element/generatepress-block-element' ];

			if ( 'undefined' === typeof blockPanel || ! blockPanel.opened ) {
				wp.data.dispatch( 'core/edit-post' ).toggleEditorPanelOpened( 'generatepress-block-element/generatepress-block-element' );
			}
		}

		// Set the Block Element as a hook by default.
		if ( ! this.props.meta._generate_block_type ) {
			this.props.updateMeta( { _generate_block_type: 'hook' } );
		}
	}

	componentDidUpdate() {
		const style = document.getElementById( 'gp-block-elements-css' );
		style.innerHTML = `html {--gp-block-element-width: ${ this.getWidth().width }${ this.getWidth().unit }}`;

		const meta = wp.data.select( 'core/editor' ).getEditedPostAttribute( 'meta' );

		if ( 'content-template' === meta._generate_block_type ) {
			if ( meta._generate_use_theme_post_container ) {
				if ( ! document.body.classList.contains( 'using-theme-post-container' ) ) {
					document.body.classList.add( 'using-theme-post-container' );
				}
			} else if ( document.body.classList.contains( 'using-theme-post-container' ) ) {
				document.body.classList.remove( 'using-theme-post-container' );
			}
		}

		if ( 'archive-navigation-template' === meta._generate_block_type || 'post-navigation-template' === meta._generate_block_type ) {
			if ( meta._generate_use_archive_navigation_container ) {
				if ( ! document.body.classList.contains( 'using-theme-pagination-container' ) ) {
					document.body.classList.add( 'using-theme-pagination-container' );
				}
			} else if ( document.body.classList.contains( 'using-theme-pagination-container' ) ) {
				document.body.classList.remove( 'using-theme-pagination-container' );
			}
		}
	}

	getWidth() {
		const meta = wp.data.select( 'core/editor' ).getEditedPostAttribute( 'meta' );
		let width = 100;
		let unit = '%';

		if ( 'left-sidebar' === meta._generate_block_type ) {
			width = gpPremiumBlockElements.leftSidebarWidth;
			unit = 'px';
		}

		if ( 'right-sidebar' === meta._generate_block_type ) {
			width = gpPremiumBlockElements.rightSidebarWidth;
			unit = 'px';
		}

		if ( 'content-template' === meta._generate_block_type || 'post-meta-template' === meta._generate_block_type || 'post-navigation-template' === meta._generate_block_type ) {
			width = gpPremiumBlockElements.contentWidth;
			unit = 'px';
		}

		if ( meta._generate_block_element_editor_width ) {
			width = wp.data.select( 'core/editor' ).getEditedPostAttribute( 'meta' )._generate_block_element_editor_width;
		}

		if ( meta._generate_block_element_editor_width_unit ) {
			unit = wp.data.select( 'core/editor' ).getEditedPostAttribute( 'meta' )._generate_block_element_editor_width_unit;
		}

		return {
			width,
			unit,
		};
	}

	render() {
		// Nested object destructuring.
		const {
			meta: {
				_generate_block_element_editor_width: editorWidth,
				_generate_block_element_editor_width_unit: editorWidthUnit,
				_generate_block_type: blockType,
				_generate_hook: hook,
				_generate_custom_hook: customHook,
				_generate_hook_priority: hookPriority,
				_generate_post_loop_item_tagname: postLoopItemTagName,
				_generate_post_meta_location: postMetaLocation,
				_generate_disable_primary_post_meta: disablePrimaryPostMeta,
				_generate_disable_secondary_post_meta: disableSecondaryPostMeta,
				_generate_disable_title: disableTitle,
				_generate_disable_featured_image: disableFeaturedImage,
				_generate_use_theme_post_container: useThemePostContainer,
				_generate_post_loop_item_display: postLoopItemDisplay,
				_generate_post_loop_item_display_tax: postLoopItemDisplayTax,
				_generate_post_loop_item_display_term: postLoopItemDisplayTerm,
				_generate_post_loop_item_display_post_meta: postLoopItemDisplayPostMeta,
				_generate_disable_post_navigation: disablePostNavigation,
				_generate_disable_archive_navigation: disableArchiveNavigation,
				_generate_use_archive_navigation_container: useThemeArchiveNavContainer,
			} = {},
			updateMeta,
		} = this.props;

		const groupedHooks = [];

		Object.keys( gpPremiumBlockElements.hooks ).forEach( ( key ) => {
			const allHooks = [];
			const group = gpPremiumBlockElements.hooks[ key ].group;
			const hooks = gpPremiumBlockElements.hooks[ key ].hooks;

			Object.keys( hooks ).forEach( ( name ) => {
				allHooks.push( {
					value: hooks[ name ],
					name: hooks[ name ].replace( 'generate_', '' ),
				} );
			} );

			groupedHooks.push( {
				type: 'group',
				name: group,
				items: allHooks,
			} );
		} );

		groupedHooks.push( {
			type: 'group',
			name: __( 'Custom', 'gp-premium' ),
			items: [
				{
					value: 'custom',
					name: __( 'Custom Hook', 'gp-premium' ),
				},
			],
		} );

		const taxOptions = [ {
			label: __( 'Choose…', 'gp-premium' ),
			value: '',
		} ];

		const taxonomies = gpPremiumBlockElements.taxonomies;

		if ( taxonomies ) {
			Object.keys( taxonomies ).forEach( ( tax ) => {
				taxOptions.push( {
					label: taxonomies[ tax ],
					value: taxonomies[ tax ],
				} );
			} );
		}

		const quickHookSelectOptions = [ {
			label: __( 'Choose…', 'gp-premium' ),
			value: '',
		} ];

		if ( 'page-hero' === blockType ) {
			quickHookSelectOptions.push(
				{ label: __( 'After header', 'gp-premium' ), value: 'generate_after_header' },
				{ label: __( 'Before content container', 'gp-premium' ), value: 'generate_before_main_content' },
				{ label: __( 'Before content', 'gp-premium' ), value: 'generate_before_content' },
			);
		}

		if ( 'post-navigation-template' === blockType ) {
			quickHookSelectOptions.push(
				{ label: __( 'After content', 'gp-premium' ), value: 'generate_after_content' },
				{ label: __( 'After content container', 'gp-premium' ), value: 'generate_after_do_template_part' },
			);
		}

		let allTemplates = '';

		if ( 'post-navigation-template' === blockType ) {
			allTemplates = postNavigationTemplates;
		}

		if ( 'post-meta-template' === blockType ) {
			allTemplates = postMetaTemplates;
		}

		if ( 'site-footer' === blockType ) {
			allTemplates = siteFooterTemplates;
		}

		if ( 'content-template' === blockType ) {
			allTemplates = contentTemplates;
		}

		if ( 'archive-navigation-template' === blockType ) {
			allTemplates = archiveNavigationTemplates;
		}

		if ( 'page-hero' === blockType ) {
			allTemplates = pageHeroTemplates;
		}

		return (
			<Fragment>
				<PluginDocumentSettingPanel
					name="generatepress-block-element"
					title={ __( 'Block Element', 'gp-premium' ) }
					className="gpp-block-element-panel gpp-element-panel-label"
					icon={ getIcon( 'generatepress' ) }
				>
					{ ! gpPremiumBlockElements.isGenerateBlocksActive &&
						<BaseControl>
							<p>{ __( 'To take full advantage of Block Elements, we suggest using our GenerateBlocks plugin.', 'gp-premium' ) }</p>

							{ ! gpPremiumBlockElements.isGenerateBlocksInstalled ? (
								<a
									href={ gpPremiumBlockElements.installLink }
									className="components-button is-primary"
								>
									{ __( 'Install GenerateBlocks', 'gp-premium' ) }
								</a>
							) : (
								<a
									href={ gpPremiumBlockElements.activateLink }
									className="components-button is-primary"
								>
									{ __( 'Activate GenerateBlocks', 'gp-premium' ) }
								</a>
							) }
						</BaseControl>
					}

					<UnitPicker
						label={ __( 'Editor width', 'gp-premium' ) }
						value={ editorWidthUnit || this.getWidth().unit }
						units={ [ 'px', '%' ] }
						onClick={ ( value ) => {
							updateMeta( { _generate_block_element_editor_width_unit: value || '' } );
						} }
					/>

					<TextControl
						type="number"
						onChange={ ( value ) => {
							// value is undefined if color is cleared.
							updateMeta( { _generate_block_element_editor_width: value || '' } );
						} }
						placeholder={ this.getWidth().width }
						value={ editorWidth || '' }
					/>

					<SelectControl
						label={ __( 'Element type', 'gp-premium' ) }
						value={ blockType }
						options={ [
							{ label: __( 'Hook', 'gp-premium' ), value: 'hook' },
							{ label: __( 'Site Header', 'gp-premium' ), value: 'site-header' },
							{ label: __( 'Page Hero', 'gp-premium' ), value: 'page-hero' },
							{ label: __( 'Content Template', 'gp-premium' ), value: 'content-template' },
							{ label: __( 'Post Meta Template', 'gp-premium' ), value: 'post-meta-template' },
							{ label: __( 'Post Navigation', 'gp-premium' ), value: 'post-navigation-template' },
							{ label: __( 'Archive Navigation', 'gp-premium' ), value: 'archive-navigation-template' },
							{ label: __( 'Right Sidebar', 'gp-premium' ), value: 'right-sidebar' },
							{ label: __( 'Left Sidebar', 'gp-premium' ), value: 'left-sidebar' },
							{ label: __( 'Site Footer', 'gp-premium' ), value: 'site-footer' },
						] }
						onChange={ ( value ) => {
							document.body.classList.remove( blockType + '-block-type' );
							document.body.classList.add( value + '-block-type' );

							if ( 'page-hero' === value ) {
								updateMeta( {
									_generate_block_type: value,
									_generate_hook: 'generate_after_header',
									_generate_block_element_editor_width_unit: '%',
									_generate_block_element_editor_width: '100',
								} );
							} else if ( 'post-navigation-template' === value ) {
								updateMeta( {
									_generate_block_type: value,
									_generate_hook: 'generate_after_do_template_part',
									_generate_block_element_editor_width_unit: '%',
									_generate_block_element_editor_width: '100',
								} );
							} else if ( 'archive-navigation-template' === value ) {
								updateMeta( {
									_generate_block_type: value,
									_generate_hook: 'generate_after_main_content',
									_generate_hook_priority: '20',
									_generate_block_element_editor_width_unit: '%',
									_generate_block_element_editor_width: '100',
								} );
							} else {
								updateMeta( {
									_generate_block_type: value,
									_generate_block_element_editor_width_unit: '',
									_generate_block_element_editor_width: '',
								} );
							}
						} }
					/>

					{ gpPremiumBlockElements.isGenerateBlocksActive && !! allTemplates &&
						<BaseControl>
							<PanelBody
								initialOpen={ false }
								name="generatepress-block-element-templates"
								title={ __( 'Templates', 'gp-premium' ) }
								className="gpp-block-element-template-panel"
							>
								{ Object.keys( allTemplates ).map( ( template ) => {
									return (
										<button
											key={ template }
											className="gpp-block-elements-template-button"
											onClick={ () => {
												allTemplates[ template ].content = allTemplates[ template ].content.replaceAll( '#dynamic-background-image', gpPremiumBlockElements.bgImageFallback );
												const blockContent = parse( allTemplates[ template ].content );

												const allBlocks = wp.data.select( 'core/block-editor' ).getBlocks();
												let hasEmptyParagraphBlock = false;

												if ( allBlocks.length === 1 ) {
													if ( 'core/paragraph' === allBlocks[ 0 ].name && ! allBlocks[ 0 ].attributes.content ) {
														hasEmptyParagraphBlock = true;
													}
												}

												if ( blockContent.length ) {
													if ( hasEmptyParagraphBlock ) {
														wp.data.dispatch( 'core/block-editor' ).replaceBlocks( allBlocks[ 0 ].clientId, blockContent );
													} else {
														wp.data.dispatch( 'core/block-editor' ).insertBlocks( blockContent );
													}
												}

												const blockMeta = allTemplates[ template ].meta;
												const newMeta = {};

												if ( blockMeta ) {
													blockMeta.forEach( ( meta ) => {
														newMeta[ meta.key ] = meta.value;
													} );
												}

												if ( Object.keys( newMeta ).length > 0 ) {
													updateMeta( newMeta );
												}
											} }
										>
											{ 'undefined' !== typeof allTemplates[ template ].thumbnail && !! allTemplates[ template ].thumbnail &&
												<LazyLoad overflow once>
													<img
														src={ gpPremiumBlockElements.templateImageUrl + '/' + allTemplates[ template ].thumbnail }
														alt={ allTemplates[ template ].label }
													/>
												</LazyLoad>
											}

											<div className="gpp-block-template-label">{ allTemplates[ template ].label }</div>
										</button>
									);
								} ) }
							</PanelBody>
						</BaseControl>
					}

					{ ( 'right-sidebar' === blockType || 'left-sidebar' === blockType ) &&
						<Notice
							status="info"
							isDismissible={ false }
							className="gpp-block-element-notice"
						>
							{ __( 'This will remove the current sidebar widgets for the selected sidebar. Your layout must have a sidebar set for this Element to show.', 'gp-premium' ) }
						</Notice>
					}

					{ 'site-footer' === blockType &&
						<BaseControl>
							<Notice
								status="info"
								isDismissible={ false }
								className="gpp-block-element-notice"
							>
								{ __( 'This Element will replace your site footer area that holds your copyright message. It will not replace footer widgets if they exist.', 'gp-premium' ) }
							</Notice>
						</BaseControl>
					}

					{ 'post-meta-template' === blockType &&
						<Fragment>
							<SelectControl
								label={ __( 'Location', 'gp-premium' ) }
								value={ postMetaLocation }
								options={ [
									{ label: __( 'After post title', 'gp-premium' ), value: 'after-post-title' },
									{ label: __( 'Before post title', 'gp-premium' ), value: 'before-post-title' },
									{ label: __( 'After content', 'gp-premium' ), value: 'after-content' },
									{ label: __( 'Custom', 'gp-premium' ), value: 'custom' },
								] }
								onChange={ ( value ) => {
									updateMeta( { _generate_post_meta_location: value } );
								} }
							/>
						</Fragment>
					}

					{ quickHookSelectOptions.length > 1 &&
						<SelectControl
							label={ __( 'Quick hook select', 'gp-premium' ) }
							value={ hook || '' }
							options={ quickHookSelectOptions }
							onChange={ ( value ) => {
								updateMeta( { _generate_hook: value } );
							} }
						/>
					}

					{ (
						! blockType ||
						'hook' === blockType ||
						'page-hero' === blockType ||
						'post-navigation-template' === blockType ||
						'archive-navigation-template' === blockType ||
						( 'post-meta-template' === blockType && 'custom' === postMetaLocation )
					) &&
						<Fragment>
							<BaseControl
								id="gpp-hook-select"
								label={ __( 'Hook name', 'gp-premium' ) }
								className="gpp-hook-select"
							>
								<SelectSearch
									options={ groupedHooks }
									className={ ( key ) => {
										if ( 'container' === key ) {
											return 'gpp-block-element-search-select';
										}

										if ( 'input' === key ) {
											return 'components-text-control__input';
										}

										return 'select-search__' + key;
									} }
									value={ hook }
									placeholder={ __( 'Choose your hook', 'gp-premium' ) }
									search={ true }
									onChange={ ( value ) => {
										updateMeta( { _generate_hook: value || '' } );
									} }
								/>
							</BaseControl>

							{ 'custom' === hook &&
								<TextControl
									label={ __( 'Custom hook name', 'gp-premium' ) }
									type="text"
									onChange={ ( value ) => {
										updateMeta( { _generate_custom_hook: value || '' } );
									} }
									value={ customHook || '' }
								/>
							}

							{ !! hook &&
								<TextControl
									label={ __( 'Priority', 'gp-premium' ) }
									type="text"
									onChange={ ( value ) => {
										updateMeta( { _generate_hook_priority: value || '' } );
									} }
									value={ hookPriority || '' }
									placeholder="10"
								/>
							}
						</Fragment>
					}

					{ 'post-meta-template' === blockType &&
						<Fragment>
							{ (
								'' === postMetaLocation ||
								'after-post-title' === postMetaLocation ||
								'before-post-title' === postMetaLocation ||
								'custom' === postMetaLocation
							) &&
								<ToggleControl
									checked={ !! disablePrimaryPostMeta }
									label={ __( 'Replace default primary post meta', 'gp-premium' ) }
									onChange={ ( value ) => {
										updateMeta( { _generate_disable_primary_post_meta: value } );
									} }
								/>
							}

							{ ( 'after-content' === postMetaLocation || 'custom' === postMetaLocation ) &&
								<ToggleControl
									checked={ !! disableSecondaryPostMeta }
									label={ __( 'Replace default secondary post meta', 'gp-premium' ) }
									onChange={ ( value ) => {
										updateMeta( { _generate_disable_secondary_post_meta: value } );
									} }
								/>
							}
						</Fragment>
					}

					{ 'content-template' === blockType &&
						<Fragment>
							<SelectControl
								label={ __( 'Tag name', 'gp-premium' ) }
								value={ postLoopItemTagName }
								options={ [
									{ label: 'article', value: 'article' },
									{ label: 'div', value: 'div' },
									{ label: 'section', value: 'section' },
									{ label: 'aside', value: 'aside' },
								] }
								onChange={ ( value ) => {
									updateMeta( { _generate_post_loop_item_tagname: value } );
								} }
							/>

							<SelectControl
								label={ __( 'Apply to', 'gp-premium' ) }
								value={ postLoopItemDisplay }
								options={ [
									{ label: __( 'All posts', 'gp-premium' ), value: '' },
									{ label: __( 'Posts with term', 'gp-premium' ), value: 'has-term' },
									{ label: __( 'Posts without term', 'gp-premium' ), value: 'exclude-term' },
									{ label: __( 'Posts with custom field', 'gp-premium' ), value: 'has-post-meta' },
									{ label: __( 'Posts without custom field', 'gp-premium' ), value: 'exclude-post-meta' },
								] }
								onChange={ ( value ) => {
									updateMeta( { _generate_post_loop_item_display: value } );
								} }
							/>

							{ ( 'has-term' === postLoopItemDisplay || 'exclude-term' === postLoopItemDisplay ) &&
								<Fragment>
									<SelectControl
										label={ __( 'Taxonomy', 'gp-premium' ) }
										value={ postLoopItemDisplayTax }
										options={ taxOptions }
										onChange={ ( value ) => {
											updateMeta( { _generate_post_loop_item_display_tax: value } );
										} }
									/>

									{ !! postLoopItemDisplayTax &&
										<TextControl
											label={ __( 'Term name', 'gp-premium' ) }
											type="text"
											onChange={ ( value ) => {
												updateMeta( { _generate_post_loop_item_display_term: value || '' } );
											} }
											value={ postLoopItemDisplayTerm || '' }
										/>
									}
								</Fragment>
							}

							{ ( 'has-post-meta' === postLoopItemDisplay || 'exclude-post-meta' === postLoopItemDisplay ) &&
								<TextControl
									label={ __( 'Post meta name', 'gp-premium' ) }
									type="text"
									onChange={ ( value ) => {
										updateMeta( { _generate_post_loop_item_display_post_meta: value || '' } );
									} }
									value={ postLoopItemDisplayPostMeta || '' }
								/>
							}

							<ToggleControl
								checked={ !! useThemePostContainer }
								label={ __( 'Keep default post container', 'gp-premium' ) }
								onChange={ ( value ) => {
									updateMeta( { _generate_use_theme_post_container: value } );
								} }
							/>
						</Fragment>
					}

					{ 'page-hero' === blockType &&
						<Fragment>
							<ToggleControl
								checked={ !! disableTitle }
								label={ __( 'Disable title', 'gp-premium' ) }
								onChange={ ( value ) => {
									updateMeta( { _generate_disable_title: value } );
								} }
							/>

							<ToggleControl
								checked={ !! disableFeaturedImage }
								label={ __( 'Disable featured image', 'gp-premium' ) }
								onChange={ ( value ) => {
									updateMeta( { _generate_disable_featured_image: value } );
								} }
							/>

							<ToggleControl
								checked={ !! disablePrimaryPostMeta }
								label={ __( 'Disable primary post meta', 'gp-premium' ) }
								onChange={ ( value ) => {
									updateMeta( { _generate_disable_primary_post_meta: value } );
								} }
							/>
						</Fragment>
					}

					{ 'site-footer' === blockType &&
						<Fragment>
							<TextControl
								className="gpp-block-dynamic-year"
								type="text"
								readOnly
								value="{{current_year}}"
								label={ __( 'Current year template tag', 'gp-premium' ) }
								help={ __( 'Use the above template tag to add the current year to your footer.', 'gp-premium' ) }
							/>
						</Fragment>
					}

					{ 'post-navigation-template' === blockType &&
						<Fragment>
							<ToggleControl
								checked={ !! disablePostNavigation }
								label={ __( 'Disable default post navigation', 'gp-premium' ) }
								onChange={ ( value ) => {
									updateMeta( { _generate_disable_post_navigation: value } );
								} }
							/>

							<ToggleControl
								checked={ !! useThemeArchiveNavContainer }
								label={ __( 'Add default archive navigation container', 'gp-premium' ) }
								onChange={ ( value ) => {
									updateMeta( { _generate_use_archive_navigation_container: value } );
								} }
							/>
						</Fragment>
					}

					{ 'archive-navigation-template' === blockType &&
						<Fragment>
							<ToggleControl
								checked={ !! disableArchiveNavigation }
								label={ __( 'Disable default pagination', 'gp-premium' ) }
								onChange={ ( value ) => {
									updateMeta( { _generate_disable_archive_navigation: value } );
								} }
							/>

							<ToggleControl
								checked={ !! useThemeArchiveNavContainer }
								label={ __( 'Keep default archive navigation container', 'gp-premium' ) }
								onChange={ ( value ) => {
									updateMeta( { _generate_use_archive_navigation_container: value } );
								} }
							/>
						</Fragment>
					}
				</PluginDocumentSettingPanel>
			</Fragment>
		);
	}
}

const applyWithSelect = withSelect( ( select ) => {
	const { getEditedPostAttribute } = select( 'core/editor' );

	return {
		meta: getEditedPostAttribute( 'meta' ),
	};
} );

const applyWithDispatch = withDispatch( ( dispatch, { meta } ) => {
	const { editPost } = dispatch( 'core/editor' );

	return {
		updateMeta( newMeta ) {
			editPost( { meta: { ...meta, ...newMeta } } ); // Important: Old and new meta need to be merged in a non-mutating way!
		},
	};
} );

const render = compose( [
	applyWithSelect,
	applyWithDispatch,
] )( BlockElementSettings );

registerPlugin( 'generatepress-block-element', {
	icon: null,
	render,
} );
