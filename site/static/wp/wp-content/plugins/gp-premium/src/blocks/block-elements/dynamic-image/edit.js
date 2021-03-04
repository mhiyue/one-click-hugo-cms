/**
 * Block: Dynamic image.
 */

import './editor.scss';
import classnames from 'classnames';

import {
	__,
} from '@wordpress/i18n';

import {
	Component,
	Fragment,
} from '@wordpress/element';

import {
	InspectorControls,
} from '@wordpress/block-editor';

import {
	PanelBody,
	SelectControl,
	TextControl,
	Icon,
	Placeholder,
	ToggleControl,
} from '@wordpress/components';

class DynamicBlockImage extends Component {
	render() {
		const {
			attributes,
			setAttributes,
		} = this.props;

		const {
			imageSize,
			imageType,
			imageSource,
			linkTo,
			linkToCustomField,
			imageWidth,
			imageHeight,
			avatarSize,
			avatarRounded,
			gpDynamicSourceInSameTerm,
			gpDynamicSourceInSameTermTaxonomy,
		} = attributes;

		const bgImageSizes = [];

		Object.keys( gpPremiumBlockElements.imageSizes ).forEach( ( size ) => {
			bgImageSizes.push( {
				label: gpPremiumBlockElements.imageSizes[ size ],
				value: gpPremiumBlockElements.imageSizes[ size ],
			} );
		} );

		const imageDimensions = gpPremiumBlockElements.imageSizeDimensions;
		let previewWidth = imageWidth;
		let previewHeight = imageHeight;

		if ( ! previewWidth ) {
			if ( 'undefined' !== typeof imageDimensions[ imageSize ] && imageDimensions[ imageSize ].width ) {
				previewWidth = imageDimensions[ imageSize ].width;
			}
		}

		if ( ! previewHeight ) {
			if ( 'undefined' !== typeof imageDimensions[ imageSize ] && imageDimensions[ imageSize ].height ) {
				previewHeight = imageDimensions[ imageSize ].height;
			}
		}

		let previewImage = gpPremiumBlockElements.featuredImagePlaceholder;

		if ( 'author-avatar' === imageType || ( previewWidth === previewHeight ) ) {
			previewImage = gpPremiumBlockElements.authorImagePlaceholder;
		}

		return (
			<Fragment>
				<InspectorControls>
					<PanelBody>
						<SelectControl
							label={ __( 'Type', 'gp-premium' ) }
							value={ imageType }
							options={ [
								{ label: __( 'Choose…', 'gp-premium' ), value: '' },
								{ label: __( 'Featured image', 'gp-premium' ), value: 'featured-image' },
								{ label: __( 'Author avatar', 'gp-premium' ), value: 'author-avatar' },
							] }
							onChange={ ( value ) => {
								setAttributes( {
									imageType: value,
								} );
							} }
						/>

						{ 'featured-image' === imageType &&
							<Fragment>
								<SelectControl
									label={ __( 'Source', 'gp-premium' ) }
									value={ imageSource }
									options={ [
										{ label: __( 'Current post', 'gp-premium' ), value: 'current-post' },
										{ label: __( 'Next post', 'gp-premium' ), value: 'next-post' },
										{ label: __( 'Previous post', 'gp-premium' ), value: 'previous-post' },
									] }
									onChange={ ( value ) => {
										setAttributes( {
											imageSource: value,
										} );
									} }
								/>

								{ ( 'next-post' === imageSource || 'previous-post' === imageSource ) &&
									<Fragment>
										<ToggleControl
											label={ __( 'In same term', 'gp-premium' ) }
											help={ __( 'Check for posts with the same term as the current post.', 'gp-premim' ) }
											checked={ !! gpDynamicSourceInSameTerm }
											onChange={ ( value ) => {
												setAttributes( {
													gpDynamicSourceInSameTerm: value,
												} );
											} }
										/>

										{ !! gpDynamicSourceInSameTerm &&
											<TextControl
												label={ __( 'Taxonomy', 'gp-premium' ) }
												help={ __( 'The taxonomy to check if in the same term.', 'gp-premim' ) }
												type="text"
												value={ gpDynamicSourceInSameTermTaxonomy }
												onChange={ ( value ) => {
													setAttributes( {
														gpDynamicSourceInSameTermTaxonomy: value,
													} );
												} }
											/>
										}
									</Fragment>
								}

								<SelectControl
									label={ __( 'Image size', 'gp-premium' ) }
									value={ imageSize }
									options={ bgImageSizes }
									onChange={ ( value ) => {
										setAttributes( {
											imageSize: value,
										} );
									} }
								/>

								<TextControl
									label={ __( 'Image width', 'gp-premium' ) }
									type="number"
									value={ imageWidth || '' }
									placeholder={ previewWidth }
									onChange={ ( value ) => {
										setAttributes( {
											imageWidth: value,
										} );
									} }
									onBlur={ () => {
										if ( imageWidth ) {
											setAttributes( {
												imageWidth: parseInt( imageWidth ),
											} );
										}
									} }
									onClick={ ( e ) => {
										// Make sure onBlur fires in Firefox.
										e.currentTarget.focus();
									} }
								/>

								<TextControl
									label={ __( 'Image height', 'gp-premium' ) }
									type="number"
									value={ imageHeight || '' }
									placeholder={ previewHeight }
									onChange={ ( value ) => {
										setAttributes( {
											imageHeight: value,
										} );
									} }
									onBlur={ () => {
										if ( imageHeight ) {
											setAttributes( {
												imageHeight: parseInt( imageHeight ),
											} );
										}
									} }
									onClick={ ( e ) => {
										// Make sure onBlur fires in Firefox.
										e.currentTarget.focus();
									} }
								/>

								<SelectControl
									label={ __( 'Link to', 'gp-premium' ) }
									value={ linkTo }
									options={ [
										{ label: __( 'None', 'gp-premium' ), value: '' },
										{ label: __( 'Single post', 'gp-premium' ), value: 'single-post' },
										{ label: __( 'Custom field', 'gp-premium' ), value: 'custom-field' },
									] }
									onChange={ ( value ) => {
										setAttributes( {
											linkTo: value,
										} );
									} }
								/>

								{ 'custom-field' === linkTo &&
									<TextControl
										label={ __( 'Custom field name', 'gp-premium' ) }
										type={ 'text' }
										value={ linkToCustomField }
										onChange={ ( value ) => {
											setAttributes( {
												linkToCustomField: value,
											} );
										} }
									/>
								}
							</Fragment>
						}

						{ 'author-avatar' === imageType &&
							<Fragment>
								<TextControl
									label={ __( 'Image size', 'gp-premium' ) }
									type="number"
									value={ avatarSize || '' }
									onChange={ ( value ) => {
										setAttributes( {
											avatarSize: parseInt( value ),
										} );
									} }
								/>

								<ToggleControl
									label={ __( 'Make image rounded', 'gp-premium' ) }
									checked={ !! avatarRounded }
									onChange={ ( value ) => {
										setAttributes( {
											avatarRounded: value,
										} );
									} }
								/>
							</Fragment>
						}
					</PanelBody>
				</InspectorControls>

				{ ! imageType &&
					<Placeholder
						label={ __( 'Dynamic image', 'gp-premium' ) }
						instructions={ __( 'Choose your dynamic image type.', 'gp-premium' ) }
					>
						<SelectControl
							label={ __( 'Type', 'gp-premium' ) }
							value={ imageType }
							options={ [
								{ label: __( 'Choose…', 'gp-premium' ), value: '' },
								{ label: __( 'Featured image', 'gp-premium' ), value: 'featured-image' },
								{ label: __( 'Author avatar', 'gp-premium' ), value: 'author-avatar' },
							] }
							onChange={ ( value ) => {
								setAttributes( {
									imageType: value,
								} );
							} }
						/>
					</Placeholder>
				}

				<div className="gpp-dynamic-image-preview">
					<Fragment>
						{ 'featured-image' === imageType &&
							<Fragment>
								<div className="components-gpp-dynamic-image-placeholder__label">
									<Icon icon={ 'format-image' } />
								</div>

								<img
									src={ previewImage }
									className="dynamic-featured-image gpp-dynamic-image-placeholder"
									width={ previewWidth || '' }
									height={ previewHeight || '' }
									alt={ __( 'Dynamic image placeholder', 'gp-premium' ) }
								/>
							</Fragment>
						}

						{ 'author-avatar' === imageType &&
							<Fragment>
								<div className="components-gpp-dynamic-image-placeholder__label">
									<Icon icon={ 'admin-users' } />
								</div>

								<img
									src={ previewImage }
									className={ classnames( {
										'dynamic-author-image': true,
										'gpp-dynamic-image-placeholder': true,
										'dynamic-author-image-rounded': !! avatarRounded,
									} ) }
									width={ avatarSize || null }
									height={ avatarSize || null }
									alt={ __( 'Dynamic image placeholder', 'gp-premium' ) }
								/>
							</Fragment>
						}
					</Fragment>
				</div>
			</Fragment>
		);
	}
}

export default DynamicBlockImage;
