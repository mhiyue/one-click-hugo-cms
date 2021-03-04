import './editor.scss';
import LazyLoad, { forceCheck } from 'react-lazyload';
import versionCompare from '../utils/version-compare';

/**
 * WordPress dependencies
 */
import {
	__,
	sprintf,
} from '@wordpress/i18n';

import {
	Button,
	Placeholder,
	Spinner,
	ToggleControl,
	Tooltip,
	SelectControl,
	TextControl,
} from '@wordpress/components';

import {
	render,
	Component,
	Fragment,
} from '@wordpress/element';

import {
	decodeEntities,
} from '@wordpress/html-entities';

import apiFetch from '@wordpress/api-fetch';

class App extends Component {
	constructor() {
		super( ...arguments );

		this.state = {
			allSites: {},
			isAPIWorking: false,
			siteOpened: false,
			siteData: {},
			siteSlug: '',
			sitePlugins: {},
			hasData: {},
			hasWidgets: false,
			importOptions: true,
			importContent: true,
			confirmImport: false,
			importComplete: false,
			installablePlugins: [],
			activePlugins: [],
			manualPlugins: [],
			refreshingSites: false,
			hasBackup: gppSiteLibrary.hasBackup,
			pageBuilder: 'No Page Builder',
			category: '',
			device: 'desktop',
		};

		this.importThemeOptions = this.importThemeOptions.bind( this );
		this.installPlugins = this.installPlugins.bind( this );
		this.activatePlugins = this.activatePlugins.bind( this );
		this.importContent = this.importContent.bind( this );
		this.importSiteOptions = this.importSiteOptions.bind( this );
		this.importWidgets = this.importWidgets.bind( this );
	}

	componentDidMount() {
		apiFetch( {
			path: '/generatepress-site-library/v1/get_sites',
			method: 'POST',
			data: {
				forceRefresh: false,
			},
		} ).then( ( result ) => {
			this.setState( {
				isAPILoaded: true,
				allSites: result.response,
			} );
		} );
	}

	importThemeOptions( e ) {
		const message = e.target.nextElementSibling;
		message.classList.add( 'gpp-library-action-message--show' );
		message.textContent = __( 'Importing theme options', 'gp-premium' );

		apiFetch( {
			path: '/generatepress-site-library/v1/import_theme_options',
			method: 'POST',
			data: {
				siteData: this.state.siteData,
				siteSlug: this.state.siteData.name.replace( /\s+/g, '_' ).toLowerCase(),
				importOptions: this.state.importOptions,
				importContent: this.state.importContent,
			},
		} ).then( ( result ) => {
			message.textContent = result.response;

			if ( ! result.success || ! result.response ) {
				message.classList.add( 'gblocks-action-message--error' );
			}

			setTimeout( () => {
				if ( !! this.state.importContent ) {
					if ( Object.keys( this.state.hasData.plugin_data ).length > 0 ) {
						this.installPlugins( message );
					} else {
						this.importContent( message );
					}
				} else {
					message.textContent = __( 'Import Complete', 'gp-premium' );

					this.setState( {
						isAPIWorking: false,
						importComplete: true,
						hasBackup: true,
					} );
				}
			}, 2000 );
		} );
	}

	installPlugins( message ) {
		if ( 'undefined' !== typeof message.target ) {
			message = message.target.nextElementSibling;
		}

		message.classList.add( 'gpp-library-action-message--show' );
		message.textContent = __( 'Installing plugins', 'gp-premium' );

		{
			Object.entries( this.state.hasData.plugin_data ).forEach( ( [ index, value ] ) => {
				let pluginSlug = value.slug.split( '/' )[ 0 ];
				let pluginName = value.name;

				if ( ! value.installed ) {
					// Install BB Lite if Pro doesn't exist.
					if ( 'bb-plugin' === pluginSlug ) {
						pluginSlug = 'beaver-builder-lite-version';
						pluginName = 'Beaver Builder Lite';
					}

					message.textContent = sprintf(
						/* translators: Installing "Plugin Name" */
						__( 'Installing %s', 'gp-premium' ),
						pluginName
					);

					wp.updates.installPlugin( {
						slug: pluginSlug,
						success: ( data ) => {
							console.log( data ); // eslint-disable-line no-console

							// Remove current plugin from queue
							delete this.state.hasData.plugin_data[ index ];

							if ( Object.keys( this.state.hasData.plugin_data ).length === 0 ) {
								this.activatePlugins( message );
							}
						},
						error: ( data ) => {
							console.log( data ); // eslint-disable-line no-console

							// Remove current plugin from queue
							delete this.state.hasData.plugin_data[ index ];

							if ( Object.keys( this.state.hasData.plugin_data ).length === 0 ) {
								this.activatePlugins( message );
							}
						},
					} );
				} else {
					// Remove current plugin from queue
					delete this.state.hasData.plugin_data[ index ];

					if ( Object.keys( this.state.hasData.plugin_data ).length === 0 ) {
						this.activatePlugins( message );
					}
				}
			} );
		}
	}

	activatePlugins( message ) {
		message.classList.add( 'gpp-library-action-message--show' );
		message.textContent = __( 'Activating plugins', 'gp-premium' );

		apiFetch( {
			path: '/generatepress-site-library/v1/activate_plugins',
			method: 'POST',
			data: {
				siteData: this.state.siteData,
				siteSlug: this.state.siteData.name.replace( /\s+/g, '_' ).toLowerCase(),
				importOptions: this.state.importOptions,
				importContent: this.state.importContent,
			},
		} ).then( ( result ) => {
			message.textContent = result.response;

			if ( ! result.success || ! result.response ) {
				message.classList.add( 'gblocks-action-message--error' );
			}

			setTimeout( () => {
				this.importContent( message );
			}, 2000 );
		} );
	}

	importContent( message ) {
		message.classList.add( 'gpp-library-action-message--show' );
		message.textContent = __( 'Importing content', 'gp-premium' );

		apiFetch( {
			path: '/generatepress-site-library/v1/import_content',
			method: 'POST',
			data: {
				siteData: this.state.siteData,
				siteSlug: this.state.siteData.name.replace( /\s+/g, '_' ).toLowerCase(),
				importOptions: this.state.importOptions,
				importContent: this.state.importContent,
			},
		} ).then( ( result ) => {
			message.textContent = result.response;

			if ( ! result.success || ! result.response ) {
				message.classList.add( 'gblocks-action-message--error' );
			}

			setTimeout( () => {
				this.importSiteOptions( message );
			}, 2000 );
		} );
	}

	importSiteOptions( message ) {
		message.classList.add( 'gpp-library-action-message--show' );
		message.textContent = __( 'Importing site options', 'gp-premium' );

		apiFetch( {
			path: '/generatepress-site-library/v1/import_site_options',
			method: 'POST',
			data: {
				siteData: this.state.siteData,
				siteSlug: this.state.siteData.name.replace( /\s+/g, '_' ).toLowerCase(),
				importOptions: this.state.importOptions,
				importContent: this.state.importContent,
			},
		} ).then( ( result ) => {
			message.textContent = result.response;

			if ( ! result.success || ! result.response ) {
				message.classList.add( 'gblocks-action-message--error' );
			}

			setTimeout( () => {
				if ( this.state.hasWidgets ) {
					this.importWidgets( message );
				} else {
					message.textContent = __( 'Import Complete', 'gp-premium' );

					this.setState( {
						isAPIWorking: false,
						importComplete: true,
						hasBackup: true,
					} );
				}
			}, 2000 );
		} );
	}

	importWidgets( message ) {
		message.classList.add( 'gpp-library-action-message--show' );
		message.textContent = __( 'Importing widgets', 'gp-premium' );

		apiFetch( {
			path: '/generatepress-site-library/v1/import_widgets',
			method: 'POST',
			data: {
				siteData: this.state.siteData,
				siteSlug: this.state.siteData.name.replace( /\s+/g, '_' ).toLowerCase(),
				importOptions: this.state.importOptions,
				importContent: this.state.importContent,
			},
		} ).then( ( result ) => {
			message.textContent = result.response;

			if ( ! result.success || ! result.response ) {
				message.classList.add( 'gblocks-action-message--error' );
			}

			setTimeout( () => {
				message.textContent = __( 'Import Complete', 'gp-premium' );

				this.setState( {
					isAPIWorking: false,
					importComplete: true,
					hasBackup: true,
				} );
			}, 2000 );
		} );
	}

	restoreBackup( e ) {
		const message = e.target.nextElementSibling;
		message.classList.add( 'gpp-library-action-message--show' );
		message.textContent = __( 'Restoring theme options', 'gp-premium' );

		apiFetch( {
			path: '/generatepress-site-library/v1/restore_theme_options',
			method: 'POST',
		} ).then( ( result ) => {
			message.textContent = result.response;

			if ( ! result.success || ! result.response ) {
				message.classList.add( 'gblocks-action-message--error' );
			}

			setTimeout( () => {
				message.textContent = __( 'Restoring content', 'gp-premium' );

				apiFetch( {
					path: '/generatepress-site-library/v1/restore_content',
					method: 'POST',
				} ).then( ( contentResult ) => {
					message.textContent = contentResult.response;

					if ( ! contentResult.success || ! contentResult.response ) {
						message.classList.add( 'gblocks-action-message--error' );
					}

					this.setState( {
						isAPIWorking: false,
						hasBackup: false,
					} );
				} );
			}, 2000 );
		} );
	}

	render() {
		if ( ! this.state.isAPILoaded ) {
			return (
				<Placeholder className="gpp-library-placeholder">
					<Spinner />
				</Placeholder>
			);
		}

		const allSites = this.state.allSites;

		if ( ! allSites || 'no results' === allSites ) {
			return (
				<div className="generatepress-site-library-no-results">
					<p>{ __( 'No sites were found.', 'gp-premium' ) } <a href="https://docs.generatepress.com/article/site-library-unavailable/" target="_blank" rel="noreferrer noopener">{ __( 'Why?', 'gp-premium' ) }</a></p>
					<Button
						isPrimary
						onClick={ () => {
							this.setState( {
								refreshingSites: true,
							} );

							apiFetch( {
								path: '/generatepress-site-library/v1/get_sites',
								method: 'POST',
								data: {
									forceRefresh: true,
								},
							} ).then( ( result ) => {
								this.setState( {
									isAPILoaded: true,
									allSites: result.response,
									refreshingSites: false,
								} );
							} );
						} }
					>
						{ this.state.refreshingSites && <Spinner /> }
						{ ! this.state.refreshingSites && __( 'Try again', 'gp-premium' ) }
					</Button>
				</div>
			);
		}

		const pageBuilderOptions = [ {
			label: __( 'None', 'gp-premium' ),
			value: '',
		} ];

		const pageBuilders = [];

		if ( allSites ) {
			Object.keys( allSites ).forEach( ( name ) => {
				allSites[ name ].page_builder.forEach( ( pageBuilder ) => {
					if ( ! pageBuilders.includes( pageBuilder ) ) {
						if ( 'No Page Builder' === pageBuilder ) {
							return;
						}

						pageBuilderOptions.push( {
							label: pageBuilder,
							value: pageBuilder,
						} );

						pageBuilders.push( pageBuilder );
					}
				} );
			} );
		}

		const categoryOptions = [ {
			label: __( 'All', 'gp-premium' ),
			value: '',
		} ];

		const categories = [];

		if ( allSites ) {
			Object.keys( allSites ).forEach( ( name ) => {
				allSites[ name ].category.forEach( ( category ) => {
					if ( ! categories.includes( category ) ) {
						categoryOptions.push( {
							label: category,
							value: category,
						} );

						categories.push( category );
					}
				} );
			} );
		}

		let iframeWidth = '';

		if ( 'tablet' === this.state.device ) {
			iframeWidth = '768px';
		}

		if ( 'mobile' === this.state.device ) {
			iframeWidth = '480px';
		}

		return (
			<Fragment>
				<div className="generatepress-site-library">
					{ !! this.state.hasBackup &&
						<div className="generatepress-site-library-restore">
							<h2>{ __( 'Existing Site Import Detected', 'gp-premium' ) }</h2>
							<p>{ __( 'It is highly recommended that you remove the last site you imported before importing a new one.', 'gp-premium' ) }</p>
							<p>{ __( 'This process restores your previous options, widgets and active plugins. It will also remove your imported content and CSS.', 'gp-premium' ) }</p>

							<div className="gpp-library-action-button">
								<Button
									isPrimary
									onClick={ ( e ) => {
										// eslint-disable-next-line
										if ( window.confirm( __( 'This process makes changes to your website. If it contains important data, we suggest backing it up before proceeding.', 'gp-premium' ) ) ) {
											this.setState( { isAPIWorking: true } );
											this.restoreBackup( e );
										}
									} }
								>
									{ this.state.isAPIWorking && <Spinner /> }
									{ ! this.state.isAPIWorking && __( 'Remove imported site', 'gp-premium' ) }
								</Button>

								<span className="gpp-library-action-message"></span>

								{ ! this.state.isAPIWorking &&
									<Button
										onClick={ () => {
											this.setState( { hasBackup: false } );
										} }
									>
										{ __( 'No thanks', 'gp-premium' ) }
									</Button>
								}
							</div>
						</div>
					}

					{ ! this.state.siteOpened && ! this.state.hasBackup &&
						<Fragment>
							<div className="generatepress-site-library-filter">
								{ 'No Page Builder' === this.state.pageBuilder &&
									<SelectControl
										label={ __( 'Category', 'gp-premium' ) }
										options={ categoryOptions }
										value={ this.state.category }
										onChange={ ( value ) => {
											this.setState( {
												category: value,
												pageBuilder: 'No Page Builder',
											} );

											setTimeout( () => {
												forceCheck();
											}, 100 );
										} }
									/>
								}

								{ '' === this.state.category &&
									<SelectControl
										label={ __( 'Page Builder', 'gp-premium' ) }
										options={ pageBuilderOptions }
										value={ this.state.pageBuilder }
										onChange={ ( value ) => {
											if ( '' === value ) {
												value = 'No Page Builder';
											}

											this.setState( {
												pageBuilder: value,
												category: '',
											} );

											setTimeout( () => {
												forceCheck();
											}, 100 );
										} }
									/>
								}
							</div>

							<ul className="generatepress-site-library-list">
								{ Object.keys( allSites ).map( ( key ) => {
									if ( ! allSites[ key ].page_builder.includes( this.state.pageBuilder ) ) {
										return null;
									}

									if ( '' !== this.state.category && ! allSites[ key ].category.includes( this.state.category ) ) {
										return null;
									}

									const directory = allSites[ key ].directory;
									const thumbnail = directory + '/screenshot.png';
									const siteName = allSites[ key ].name;
									const templateTitle = decodeEntities( siteName );
									const currentVersion = gppSiteLibrary.gppVersion.split( '-' )[ 0 ];
									const minVersion = allSites[ key ].min_version.split( '-' )[ 0 ];
									const disabled = versionCompare( minVersion, currentVersion ) > 0;
									const imageWidth = allSites[ key ].image_width;
									const imageHeight = allSites[ key ].image_height;

									return (
										<li
											className={ 'generatepress-site-library-list-item' }
											key={ siteName + ':' + key }
										>
											<button
												disabled={ disabled }
												onClick={ () => {
													this.setState( {
														siteOpened: true,
														siteData: allSites[ key ],
														sitePlugins: JSON.parse( allSites[ key ].plugins ),
													} );
												} }
											>
												<div className="generatepress-site-library-list-item-image">
													<LazyLoad
														offset={ 100 }
														once
													>
														<img
															src={ thumbnail }
															alt={ siteName }
															width={ imageWidth }
															height={ imageHeight }
														/>
													</LazyLoad>
												</div>

												<div className="generatepress-site-library-list-item-title">
													{ templateTitle }

													{ !! disabled &&
														<span className="generatepress-site-library-required-version">
															{
																sprintf(
																	/* translators: Version number */
																	__( 'Requires GP Premium %s.', 'gp-premium' ),
																	allSites[ key ].min_version
																)
															}
														</span>
													}
												</div>
											</button>
										</li>
									);
								} ) }
							</ul>

							<div className="generatepress-site-library-refresh">
								<Button
									isPrimary
									onClick={ () => {
										this.setState( {
											refreshingSites: true,
										} );

										apiFetch( {
											path: '/generatepress-site-library/v1/get_sites',
											method: 'POST',
											data: {
												forceRefresh: true,
											},
										} ).then( ( result ) => {
											this.setState( {
												isAPILoaded: true,
												allSites: result.response,
												refreshingSites: false,
											} );
										} );
									} }
								>
									{ this.state.refreshingSites && <Spinner /> }
									{ ! this.state.refreshingSites && __( 'Refresh sites', 'gp-premium' ) }
								</Button>
							</div>
						</Fragment>
					}

					{ this.state.siteOpened &&
						<div className="generatepress-site-library-opened">
							<div className="generatepress-site-library-iframe">
								<iframe
									title="gpp-site-library-frame"
									src={ this.state.siteData.preview_url }
									style={ { width: iframeWidth } }
								/>
							</div>

							<div className="generatepress-site-library-info">
								<div className="generatepress-site-library-header">
									<h2>{ decodeEntities( this.state.siteData.name ) }</h2>
									<Button
										onClick={ () => {
											this.setState( {
												isAPIWorking: false,
												siteOpened: false,
												siteData: {},
												siteSlug: '',
												sitePlugins: {},
												hasData: {},
												hasWidgets: false,
												importOptions: true,
												importContent: true,
												confirmImport: false,
												importComplete: false,
												installablePlugins: [],
												activePlugins: [],
												manualPlugins: [],
											} );
										} }
									>
										<svg width="35" height="35" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" role="img" aria-hidden="true" focusable="false"><path d="M13 11.9l3.3-3.4-1.1-1-3.2 3.3-3.2-3.3-1.1 1 3.3 3.4-3.5 3.6 1 1L12 13l3.5 3.5 1-1z"></path></svg>
									</Button>
								</div>

								<div className="generatepress-site-library-content">
									<p>{ decodeEntities( this.state.siteData.description ) }</p>

									{ ! this.state.importComplete &&
										<Fragment>
											{ Object.keys( this.state.hasData ).length === 0 &&
												<Fragment>
													{ Object.keys( this.state.sitePlugins ).length > 0 &&
														<Fragment>
															<h3>{ __( 'Plugins', 'gp-premium' ) }</h3>
															<p>{ __( 'This site uses the following plugins.', 'gp-premium' ) }</p>
															<ul className="generatepress-site-library-plugins">
																{ Object.entries( this.state.sitePlugins ).map( ( [ key ] ) => {
																	return (
																		<li key={ key }>{ key }</li>
																	);
																} ) }
															</ul>
														</Fragment>
													}

													<div className="gpp-library-action-button">
														<Button
															isPrimary
															disabled={ this.state.isAPIWorking }
															onClick={ ( e ) => {
																this.setState( { isAPIWorking: true } );
																const message = e.target.nextElementSibling;
																message.textContent = __( 'Gathering information', 'gp-premium' );

																apiFetch( {
																	path: '/generatepress-site-library/v1/get_site_data',
																	method: 'POST',
																	data: {
																		siteData: this.state.siteData,
																	},
																} ).then( ( result ) => {
																	const installablePlugins = [];
																	const activePlugins = [];
																	const manualPlugins = [];

																	Object.entries( result.response.plugin_data ).forEach( ( [ index ] ) => {
																		const plugin = result.response.plugin_data[ index ];

																		if ( plugin.repo && ! plugin.installed ) {
																			installablePlugins.push( plugin.name );
																		} else if ( plugin.installed || plugin.active ) {
																			activePlugins.push( plugin.name );
																		} else {
																			manualPlugins.push( plugin.name );
																		}
																	} );

																	this.setState( {
																		isAPIWorking: false,
																		hasData: result.response,
																		sitePlugins: result.response.plugins,
																		hasWidgets: result.response.widgets,
																		installablePlugins,
																		activePlugins,
																		manualPlugins,
																	} );

																	message.classList.add( 'gpp-library-action-message--show' );
																	message.textContent = result.response;

																	if ( ! result.success || ! result.response ) {
																		message.classList.add( 'gpp-library-action-message--error' );
																	} else {
																		setTimeout( function() {
																			message.classList.remove( 'gpp-library-action-message--show' );
																		}, 3000 );
																	}
																} );
															} }
														>
															{ this.state.isAPIWorking && <Spinner /> }
															{ ! this.state.isAPIWorking && __( 'Get Started', 'gp-premium' ) }
														</Button>

														<span className="gpp-library-action-message"></span>
													</div>
												</Fragment>
											}

											{ Object.keys( this.state.hasData ).length > 0 && Object.keys( this.state.sitePlugins ).length > 0 &&
												<Fragment>
													<h3>{ __( 'Plugins', 'gp-premium' ) }</h3>

													{ this.state.installablePlugins.length > 0 &&
														<Fragment>
															<p>{ __( 'These plugins can be installed automatically.', 'gp-premium' ) }</p>
															<ul className="generatepress-site-library-plugins">
																{ this.state.installablePlugins.map( ( key ) => {
																	return (
																		<li key={ key }>{ key }</li>
																	);
																} ) }
															</ul>
														</Fragment>
													}

													{ this.state.activePlugins.length > 0 &&
														<Fragment>
															<p>{ __( 'These plugins are already installed.', 'gp-premium' ) }</p>
															<ul className="generatepress-site-library-plugins">
																{ this.state.activePlugins.map( ( key ) => {
																	return (
																		<li key={ key }>{ key }</li>
																	);
																} ) }
															</ul>
														</Fragment>
													}

													{ this.state.manualPlugins.length > 0 &&
														<Fragment>
															<p>{ __( 'These plugins need to be installed manually.', 'gp-premium' ) }</p>
															<ul className="generatepress-site-library-plugins">
																{ this.state.manualPlugins.map( ( key ) => {
																	return (
																		<li key={ key }>{ key }</li>
																	);
																} ) }
															</ul>
														</Fragment>
													}
												</Fragment>
											}

											{ Object.keys( this.state.hasData ).length > 0 &&
												<Fragment>
													<h3>{ __( 'Import', 'gp-premium' ) }</h3>

													{ ( this.state.hasData.options && ! this.state.isAPIWorking ) &&
														<Tooltip text={ __( 'This will import the options from the Customizer.', 'gp-premium' ) }>
															<ToggleControl
																checked={ !! this.state.importOptions }
																label={ __( 'Import Theme Options', 'gp-premium' ) }
																onChange={ ( value ) => {
																	this.setState( {
																		importOptions: value,
																	} );
																} }
															/>
														</Tooltip>
													}

													{ ( this.state.hasData.content && ! this.state.isAPIWorking ) &&
														<Tooltip text={ __( 'This will install and activate needed plugins, import demo content, and import site options.', 'gp-premium' ) }>
															<ToggleControl
																checked={ !! this.state.importContent }
																label={ __( 'Import Demo Content', 'gp-premium' ) }
																onChange={ ( value ) => {
																	this.setState( {
																		importContent: value,
																	} );
																} }
															/>
														</Tooltip>
													}

													{ ( !! this.state.importOptions || !! this.state.importContent ) &&
														<Fragment>
															{ ! this.state.isAPIWorking &&
																<Fragment>
																	<h3>{ __( 'Confirm Import', 'gp-premium' ) }</h3>
																	<p>{ __( 'This process makes changes to your website. If it contains important data, we suggest backing it up before proceeding.', 'gp-premium' ) }</p>

																	<ToggleControl
																		checked={ !! this.state.confirmImport }
																		label={ __( 'I understand', 'gp-premium' ) }
																		onChange={ ( value ) => {
																			this.setState( {
																				confirmImport: value,
																			} );
																		} }
																	/>
																</Fragment>
															}

															{ ( !! this.state.confirmImport && ! this.state.importComplete ) &&
																<div className="gpp-library-action-button">
																	<Button
																		isPrimary
																		disabled={ this.state.isAPIWorking }
																		onClick={ ( e ) => {
																			this.setState( { isAPIWorking: true } );

																			if ( !! this.state.importOptions ) {
																				this.importThemeOptions( e );
																			} else if ( !! this.state.importContent ) {
																				this.installPlugins( e );
																			}
																		} }
																	>
																		{ this.state.isAPIWorking && <Spinner /> }
																		{ ! this.state.isAPIWorking && __( 'Begin Import', 'gp-premium' ) }
																	</Button>

																	<span className="gpp-library-action-message"></span>
																</div>
															}
														</Fragment>
													}
												</Fragment>
											}
										</Fragment>
									}

									{ !! this.state.importComplete &&
										<Fragment>
											<h3>{ __( 'Import Complete', 'gp-premium' ) }</h3>
											<a className="components-button is-primary" href={ gppSiteLibrary.homeUrl }>{ __( 'View Site', 'gp-premium' ) }</a>

											{ this.state.siteData.uploads_url && Object.values( this.state.sitePlugins ).includes( 'elementor/elementor.php' ) &&
												<Fragment>
													<h3>{ __( 'Additional Cleanup', 'gp-premium' ) }</h3>
													<p>{ __( 'This site is using Elementor which means you will want to replace the imported image URLs.', 'gp-premium' ) }</p>
													<p>{ __( 'Take note of the old and new URLs below, then head over to the Elementor Tools area to replace them.', 'gp-premium' ) }</p>

													<TextControl
														label={ __( 'Old URL', 'gp-premium' ) }
														readOnly
														value={ this.state.siteData.uploads_url }
													/>

													<TextControl
														label={ __( 'New URL', 'gp-premium' ) }
														readOnly
														value={ gppSiteLibrary.uploadsUrl }
													/>

													<a
														href={ gppSiteLibrary.elementorReplaceUrls }
														className="components-button is-primary"
														target="_blank"
														rel="noopener noreferrer"
													>
														{ __( 'Elementor Tools', 'gp-premium' ) }
													</a>
												</Fragment>
											}
										</Fragment>
									}

									<div className="generatepress-site-library-footer">
										<Tooltip text={ __( 'Preview desktop', 'gp-premium' ) } >
											<Button
												isPrimary={ 'desktop' === this.state.device }
												onClick={ () => {
													this.setState( {
														device: 'desktop',
													} );
												} }
											>
												<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" width="1em" height="1em" viewBox="0 0 24 24"><path d="M21 14H3V4h18m0-2H3c-1.11 0-2 .89-2 2v12a2 2 0 002 2h7l-2 3v1h8v-1l-2-3h7a2 2 0 002-2V4a2 2 0 00-2-2z" fill="currentColor" /></svg>
											</Button>
										</Tooltip>

										<Tooltip text={ __( 'Preview tablet', 'gp-premium' ) } >
											<Button
												isPrimary={ 'tablet' === this.state.device }
												onClick={ () => {
													this.setState( {
														device: 'tablet',
													} );
												} }
											>
												<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" width="1em" height="1em" viewBox="0 0 24 24"><path d="M19 19H4V3h15m-7.5 20a1.5 1.5 0 01-1.5-1.5 1.5 1.5 0 011.5-1.5 1.5 1.5 0 011.5 1.5 1.5 1.5 0 01-1.5 1.5m7-23h-14A2.5 2.5 0 002 2.5v19A2.5 2.5 0 004.5 24h14a2.5 2.5 0 002.5-2.5v-19A2.5 2.5 0 0018.5 0z" fill="currentColor" /></svg>
											</Button>
										</Tooltip>

										<Tooltip text={ __( 'Preview mobile', 'gp-premium' ) } >
											<Button
												isPrimary={ 'mobile' === this.state.device }
												onClick={ () => {
													this.setState( {
														device: 'mobile',
													} );
												} }
											>
												<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" width="1em" height="1em" viewBox="0 0 24 24"><path d="M17 19H7V5h10m0-4H7c-1.11 0-2 .89-2 2v18a2 2 0 002 2h10a2 2 0 002-2V3a2 2 0 00-2-2z" fill="currentColor" /></svg>
											</Button>
										</Tooltip>
									</div>
								</div>
							</div>
						</div>
					}
				</div>
			</Fragment>
		);
	}
}

render(
	<App />,
	document.getElementById( 'gpp-site-library' )
);
