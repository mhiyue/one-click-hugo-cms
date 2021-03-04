/**
 * Block: Dynamic image.
 */

import './editor.scss';

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
	Placeholder,
	ToggleControl,
} from '@wordpress/components';

import ServerSideRender from '@wordpress/server-side-render';

class DynamicBlockImage extends Component {
	render() {
		const {
			attributes,
			setAttributes,
		} = this.props;

		const {
			contentType,
			excerptLength,
			useThemeMoreLink,
			customMoreLink,
		} = attributes;

		return (
			<Fragment>
				<InspectorControls>
					<PanelBody>
						<SelectControl
							label={ __( 'Type', 'gp-premium' ) }
							value={ contentType }
							options={ [
								{ label: __( 'Choose…', 'gp-premium' ), value: '' },
								{ label: __( 'Post content', 'gp-premium' ), value: 'post-content' },
								{ label: __( 'Post excerpt', 'gp-premium' ), value: 'post-excerpt' },
								{ label: __( 'Term description', 'gp-premium' ), value: 'term-description' },
								{ label: __( 'Author description', 'gp-premium' ), value: 'author-description' },
							] }
							onChange={ ( value ) => {
								setAttributes( {
									contentType: value,
								} );
							} }
						/>

						{ 'post-excerpt' === contentType &&
							<Fragment>
								<TextControl
									label={ __( 'Excerpt length', 'gp-premium' ) }
									type="number"
									value={ excerptLength || '' }
									placeholder={ gpPremiumBlockElements.excerptLength }
									onChange={ ( value ) => {
										setAttributes( {
											excerptLength: value,
										} );
									} }
									onBlur={ () => {
										setAttributes( {
											excerptLength: parseInt( excerptLength ),
										} );
									} }
									onClick={ ( e ) => {
										// Make sure onBlur fires in Firefox.
										e.currentTarget.focus();
									} }
								/>

								<ToggleControl
									label={ __( 'Use theme more link', 'gp-premium' ) }
									type="number"
									checked={ !! useThemeMoreLink }
									onChange={ ( value ) => {
										setAttributes( {
											useThemeMoreLink: value,
										} );
									} }
								/>

								{ ! useThemeMoreLink &&
									<TextControl
										label={ __( 'Custom more link', 'gp-premium' ) }
										type="text"
										value={ customMoreLink || '' }
										onChange={ ( value ) => {
											setAttributes( {
												customMoreLink: value,
											} );
										} }
									/>
								}
							</Fragment>
						}
					</PanelBody>
				</InspectorControls>

				{ ! contentType &&
					<Placeholder
						label={ __( 'Dynamic content', 'gp-premium' ) }
						instructions={ __( 'Choose your dynamic content type.', 'gp-premium' ) }
					>
						<SelectControl
							label={ __( 'Type', 'gp-premium' ) }
							value={ contentType }
							options={ [
								{ label: __( 'Choose…', 'gp-premium' ), value: '' },
								{ label: __( 'Post content', 'gp-premium' ), value: 'post-content' },
								{ label: __( 'Post excerpt', 'gp-premium' ), value: 'post-excerpt' },
								{ label: __( 'Term description', 'gp-premium' ), value: 'term-description' },
								{ label: __( 'Author description', 'gp-premium' ), value: 'author-description' },
							] }
							onChange={ ( value ) => {
								setAttributes( {
									contentType: value,
								} );
							} }
						/>
					</Placeholder>
				}

				{ 'post-content' === contentType &&
					<div className="gb-entry-content">
						<p>
							{ __( 'This is a placeholder for your content.', 'gp-premium' ) }
						</p>

						<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pulvinar ligula augue, quis bibendum tellus scelerisque venenatis. Pellentesque porta nisi mi. In hac habitasse platea dictumst. Etiam risus elit, molestie non volutpat ac, pellentesque sed eros. Nunc leo odio, sodales non tortor at, porttitor posuere dui.</p>
					</div>
				}

				{ 'post-excerpt' === contentType &&
					<div>
						<ServerSideRender
							block="generatepress/dynamic-content"
							attributes={ attributes }
						/>
					</div>
				}

				{ ( 'author-description' === contentType || 'term-description' === contentType ) &&
					<div className="gb-description">
						<p>
							{ __( 'This is a placeholder for your description.', 'gp-premium' ) }
						</p>

						<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pulvinar ligula augue, quis bibendum tellus scelerisque venenatis. Pellentesque porta nisi mi. In hac habitasse platea dictumst. Etiam risus elit, molestie non volutpat ac, pellentesque sed eros. Nunc leo odio, sodales non tortor at, porttitor posuere dui.</p>
					</div>
				}
			</Fragment>
		);
	}
}

export default DynamicBlockImage;
