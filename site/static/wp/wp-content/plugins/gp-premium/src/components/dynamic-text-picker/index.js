/**
 * WordPress dependencies
 */
import {
	__,
} from '@wordpress/i18n';

import {
	Component,
	Fragment,
} from '@wordpress/element';

import {
	ToggleControl,
	TextControl,
	SelectControl,
} from '@wordpress/components';

/**
 * Typography Component
 */
class DynamicTextPicker extends Component {
	render() {
		const {
			attributes,
			setAttributes,
			name,
		} = this.props;

		const {
			gpDynamicTextType,
			gpDynamicSource,
			gpDynamicTextReplace,
			gpDynamicTextTaxonomy,
			gpDynamicTextTaxonomySeparator,
			gpDynamicTextCustomField,
			gpDynamicTextBefore,
			gpDynamicDateUpdated,
			gpDynamicNoCommentsText,
			gpDynamicSingleCommentText,
			gpDynamicMultipleCommentsText,
			gpDynamicLinkType,
			gpDynamicLinkCustomField,
			gpDynamicSourceInSameTerm,
			gpDynamicSourceInSameTermTaxonomy,
			className,
			gpDynamicDateType,
			gpDynamicUpdatedDateBefore,
		} = attributes;

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

		let linkOptions = [
			{ label: __( 'Choose…', 'gp-premium' ), value: '' },
			{ label: __( 'Single post', 'gp-premium' ), value: 'single-post' },
			{ label: __( 'Author archives', 'gp-premium' ), value: 'author-archives' },
			{ label: __( 'Comments area', 'gp-premium' ), value: 'comments' },
			{ label: __( 'Next page of posts', 'gp-premium' ), value: 'next-posts' },
			{ label: __( 'Previous page of posts', 'gp-premium' ), value: 'previous-posts' },
			{ label: __( 'Post meta', 'gp-premium' ), value: 'post-meta' },
			{ label: __( 'Author meta', 'gp-premium' ), value: 'user-meta' },
			{ label: __( 'Term meta', 'gp-premium' ), value: 'term-meta' },
		];

		if ( 'terms' === gpDynamicTextType ) {
			linkOptions = [
				{ label: __( 'Choose…', 'gp-premium' ), value: '' },
				{ label: __( 'Term archives', 'gp-premium' ), value: 'term-archives' },
			];
		}

		if ( 'generateblocks/headline' === name && ! gpDynamicTextType ) {
			linkOptions = [];
		}

		const meta = wp.data.select( 'core/editor' ).getEditedPostAttribute( 'meta' );

		let showSource = !! gpDynamicTextType || !! gpDynamicLinkType;

		if ( 'post-navigation-template' !== meta._generate_block_type ) {
			showSource = false;
		}

		if ( 'next-posts' === gpDynamicLinkType || 'previous-posts' === gpDynamicLinkType ) {
			showSource = false;
		}

		let beforeTextLabel = __( 'Before text', 'gp-premim' );

		if ( 'post-date' === gpDynamicTextType && gpDynamicDateUpdated && 'published-date' === gpDynamicDateType ) {
			beforeTextLabel = __( 'Published date before text', 'gp-premium' );
		}

		return (
			<Fragment>
				<SelectControl
					label={ __( 'Dynamic text type', 'gp-premium' ) }
					value={ gpDynamicTextType }
					options={ [
						{ label: __( 'Choose…', 'gp-premium' ), value: '' },
						{ label: __( 'Title', 'gp-premium' ), value: 'title' },
						{ label: __( 'Post date', 'gp-premium' ), value: 'post-date' },
						{ label: __( 'Post author name', 'gp-premium' ), value: 'post-author' },
						{ label: __( 'List of terms', 'gp-premium' ), value: 'terms' },
						{ label: __( 'Comments number', 'gp-premium' ), value: 'comments-number' },
						{ label: __( 'Post meta', 'gp-premium' ), value: 'post-meta' },
						{ label: __( 'Term meta', 'gp-premium' ), value: 'term-meta' },
						{ label: __( 'Author meta', 'gp-premium' ), value: 'user-meta' },
					] }
					onChange={ ( value ) => {
						setAttributes( {
							gpDynamicTextType: value,
						} );

						let classes = [];

						if ( className ) {
							classes = className.split( ' ' );
						}

						const valuesToRemove = [ 'dynamic-term-class' ];
						classes = classes.filter( ( item ) => ! valuesToRemove.includes( item ) );

						if ( 'terms' === value ) {
							classes.push( 'dynamic-term-class' );
						}

						if ( classes.length > 0 ) {
							setAttributes( {
								className: classes.join( ' ' ),
							} );
						} else {
							setAttributes( {
								className: '',
							} );
						}

						if ( 'generateblocks/headline' === name ) {
							let previewText = __( 'Hello World', 'gp-premium' );

							if ( 'post-date' === value ) {
								previewText = __( 'Post date', 'gp-premium' );
							} else if ( 'post-author' === value ) {
								previewText = __( 'Post author name', 'gp-premium' );
							} else if ( 'terms' === value ) {
								previewText = __( 'Terms', 'gp-premium' );
							} else if ( 'comments-number' === value ) {
								previewText = __( 'Comments number', 'gp-premium' );
							} else if ( 'post-meta' === value ) {
								previewText = __( 'Post meta', 'gp-premium' );
							} else if ( 'user-meta' === value ) {
								previewText = __( 'User meta', 'gp-premium' );
							} else if ( 'term-meta' === value ) {
								previewText = __( 'Term meta', 'gp-premium' );
							}

							setAttributes( {
								content: previewText,
							} );
						}
					} }
				/>

				{ '' !== gpDynamicTextType &&
					<Fragment>
						<TextControl
							className="gpp-blocks-dynamic-text-replace-field"
							type={ 'text' }
							value={ gpDynamicTextReplace }
						/>

						{ 'post-date' === gpDynamicTextType &&
							<Fragment>
								<SelectControl
									label={ __( 'Date type', 'gp-premium' ) }
									value={ gpDynamicDateType }
									options={ [
										{ label: __( 'Published date', 'gp-premim' ), value: 'published-date' },
										{ label: __( 'Updated date', 'gp-premium' ), value: 'updated-date' },
									] }
									onChange={ ( value ) => {
										setAttributes( {
											gpDynamicDateType: value,
											gpDynamicTextBefore: '',
											gpDynamicUpdatedDateBefore: '',
										} );
									} }
								/>

								{ 'published-date' === gpDynamicDateType &&
									<ToggleControl
										label={ __( 'Replace with updated date', 'gp-premium' ) }
										checked={ !! gpDynamicDateUpdated }
										onChange={ ( value ) => {
											setAttributes( {
												gpDynamicDateUpdated: value,
											} );
										} }
									/>
								}
							</Fragment>
						}

						{ 'terms' === gpDynamicTextType &&
							<Fragment>
								<SelectControl
									label={ __( 'Taxonomy', 'gp-premium' ) }
									value={ gpDynamicTextTaxonomy }
									options={ taxOptions }
									onChange={ ( value ) => {
										setAttributes( {
											gpDynamicTextTaxonomy: value,
										} );
									} }
								/>

								{ 'generateblocks/headline' === name &&
									<Fragment>
										<TextControl
											label={ __( 'Term separator', 'gp-premium' ) }
											type={ 'text' }
											value={ gpDynamicTextTaxonomySeparator }
											onChange={ ( value ) => {
												setAttributes( {
													gpDynamicTextTaxonomySeparator: value,
												} );
											} }
										/>
									</Fragment>
								}
							</Fragment>
						}

						{ 'comments-number' === gpDynamicTextType &&
							<Fragment>
								<TextControl
									label={ __( 'No comments text', 'gp-premium' ) }
									type={ 'text' }
									value={ gpDynamicNoCommentsText }
									onChange={ ( value ) => {
										setAttributes( {
											gpDynamicNoCommentsText: value,
										} );
									} }
								/>

								<TextControl
									label={ __( 'Singular comments text', 'gp-premium' ) }
									type={ 'text' }
									value={ gpDynamicSingleCommentText }
									onChange={ ( value ) => {
										setAttributes( {
											gpDynamicSingleCommentText: value,
										} );
									} }
								/>

								<TextControl
									label={ __( 'Plural comments text', 'gp-premium' ) }
									help={ __( 'Use % in place of the number of comments', 'gp-premium' ) }
									type={ 'text' }
									value={ gpDynamicMultipleCommentsText }
									onChange={ ( value ) => {
										setAttributes( {
											gpDynamicMultipleCommentsText: value,
										} );
									} }
								/>
							</Fragment>
						}

						{ ( 'post-meta' === gpDynamicTextType || 'term-meta' === gpDynamicTextType || 'user-meta' === gpDynamicTextType ) &&
							<TextControl
								label={ __( 'Meta field name', 'gp-premium' ) }
								type={ 'text' }
								value={ gpDynamicTextCustomField }
								onChange={ ( value ) => {
									setAttributes( {
										gpDynamicTextCustomField: value,
									} );
								} }
							/>
						}

						{ 'generateblocks/headline' === name &&
							<Fragment>
								<TextControl
									label={ beforeTextLabel }
									type={ 'text' }
									value={ gpDynamicTextBefore }
									onChange={ ( value ) => {
										setAttributes( {
											gpDynamicTextBefore: value,
										} );
									} }
								/>

								{ 'post-date' === gpDynamicTextType && !! gpDynamicDateUpdated && 'published-date' === gpDynamicDateType &&
									<TextControl
										label={ __( 'Updated date before text', 'gp-premium' ) }
										type={ 'text' }
										value={ gpDynamicUpdatedDateBefore }
										onChange={ ( value ) => {
											setAttributes( {
												gpDynamicUpdatedDateBefore: value,
											} );
										} }
									/>
								}
							</Fragment>
						}
					</Fragment>
				}

				{ linkOptions.length > 1 &&
					<Fragment>
						<SelectControl
							label={ __( 'Dynamic link type', 'gp-premium' ) }
							value={ gpDynamicLinkType }
							options={ linkOptions }
							onChange={ ( value ) => {
								if ( 'generateblocks/button' === name ) {
									if ( value ) {
										setAttributes( {
											gpDynamicLinkType: value,
											hasUrl: true,
											url: '#',
										} );
									} else {
										setAttributes( {
											gpDynamicLinkType: value,
											hasUrl: false,
											url: '',
										} );
									}
								}

								if ( 'generateblocks/headline' === name ) {
									setAttributes( {
										gpDynamicLinkType: value,
									} );
								}
							} }
						/>

						{ ( 'post-meta' === gpDynamicLinkType || 'term-meta' === gpDynamicLinkType || 'user-meta' === gpDynamicLinkType ) &&
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
					</Fragment>
				}

				{ showSource &&
					<Fragment>
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

						{ ( 'next-post' === gpDynamicSource || 'previous-post' === gpDynamicSource ) &&
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
					</Fragment>
				}
			</Fragment>
		);
	}
}

export default DynamicTextPicker;
