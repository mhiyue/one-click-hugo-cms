/**
 * WordPress dependencies
 */

import {
	Component,
} from '@wordpress/element';

/**
 * Typography Component
 */
class DynamicTextRender extends Component {
	constructor() {
		super( ...arguments );

		this.wrapElement = this.wrapElement.bind( this );
	}

	componentDidMount() {
		if ( !! this.props.attributes.gpDynamicTextType && 'generateblocks/headline' === this.props.name ) {
			const headlineElement = document.querySelector( '.gb-headline-' + this.props.attributes.uniqueId + ' .rich-text' );

			if ( headlineElement ) {
				if ( '' !== this.props.attributes.gpDynamicTextType && this.props.attributes.gpDynamicLinkType && ! this.props.attributes.removeText ) {
					this.wrapElement( headlineElement );
				}
			}
		}
	}

	componentDidUpdate() {
		if ( !! this.props.attributes.gpDynamicTextType ) {
			let content = this.props.attributes.content;

			if ( 'generateblocks/button' === this.props.name ) {
				content = this.props.attributes.text;
			}

			if ( content !== this.props.attributes.gpDynamicTextReplace ) {
				this.props.setAttributes( {
					gpDynamicTextReplace: content,
				} );
			}
		}

		if ( !! this.props.attributes.gpDynamicTextType && 'generateblocks/headline' === this.props.name ) {
			const headlineElement = document.querySelector( '.gb-headline-' + this.props.attributes.uniqueId + ' .rich-text' );

			if ( headlineElement ) {
				const parentNode = headlineElement.parentNode;

				if ( parentNode ) {
					const hasLink = parentNode.classList.contains( 'gblocks-faux-headline-link' );

					if ( '' !== this.props.attributes.gpDynamicTextType ) {
						if ( hasLink && ! this.props.attributes.gpDynamicLinkType ) {
							parentNode.replaceWith( ...parentNode.childNodes );
						}

						if ( ! hasLink && this.props.attributes.gpDynamicLinkType && ! this.props.isSelected ) {
							this.wrapElement( headlineElement );
						}
					} else if ( hasLink ) {
						parentNode.replaceWith( ...parentNode.childNodes );
					}

					// Prevents an error when an icon is introduced and the link exists.
					if ( !! this.props.attributes.removeText || ( hasLink && this.props.isSelected ) ) {
						parentNode.replaceWith( ...parentNode.childNodes );
					}
				}
			}
		}
	}

	wrapElement( element ) {
		const wrapper = document.createElement( 'a' );
		wrapper.classList.add( 'gblocks-faux-headline-link' );

		// Insert link before the Headline text.
		element.parentNode.insertBefore( wrapper, element );

		// Move the Headline text into the wrapper.
		wrapper.appendChild( element );
	}

	render() {
		return null;
	}
}

export default DynamicTextRender;
