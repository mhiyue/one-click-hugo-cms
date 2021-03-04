document.addEventListener( 'DOMContentLoaded', function() {
	var msnryContainer = document.querySelector( '.masonry-container' );

	if ( msnryContainer ) {
		var msnry = new Masonry( msnryContainer, generateBlog.masonryInit ),
			navBelow = document.querySelector( '#nav-below' ),
			loadMore = document.querySelector( '.load-more' );

		imagesLoaded( msnryContainer, function() {
			msnry.layout();
			msnryContainer.classList.remove( 'are-images-unloaded' );

			if ( loadMore ) {
				loadMore.classList.remove( 'are-images-unloaded' );
			}

			if ( navBelow ) {
				navBelow.style.opacity = 1;
			}
		} );

		msnryContainer.parentNode.insertBefore( navBelow, msnryContainer.nextSibling );

		window.addEventListener( 'orientationchange', function() {
			msnry.layout();
		} );
	}

	var infiniteScroll = document.querySelector( '.infinite-scroll' ),
		nextLink = document.querySelector( '.nav-links .next' );

	if ( infiniteScroll && nextLink ) {
		var infiniteItems = document.querySelectorAll( '.infinite-scroll-item' ),
			container = infiniteItems[0].parentNode,
			button = document.querySelector( '.load-more a' );
			svgIcon = '';

		if ( generateBlog.icon ) {
			svgIcon = generateBlog.icon;
		}

		var infiniteScrollInit = generateBlog.infiniteScrollInit;

		infiniteScrollInit.outlayer = msnry;

		var infiniteScroll = new InfiniteScroll( container, infiniteScrollInit );

		if ( button ) {
			button.addEventListener( 'click', function( e ) {
				document.activeElement.blur();
				e.target.innerHTML = svgIcon + generateBlog.loading;
				e.target.classList.add( 'loading' );
			} );
		}

		infiniteScroll.on( 'append', function( response, path, items ) {
			if ( button && ! document.querySelector( '.generate-columns-container' ) ) {
				container.appendChild( button.parentNode );
			}

			items.forEach( function( element ) {
				var images = element.querySelectorAll( 'img' );

				if ( images ) {
					images.forEach( function( image ) {
						var imgOuterHTML = image.outerHTML;
						image.outerHTML = imgOuterHTML;
					} );
				}
			} );

			if ( msnryContainer && msnry ) {
				imagesLoaded( msnryContainer, function() {
					msnry.layout();
				} );
			}

			if ( button ) {
				button.innerHTML = svgIcon + generateBlog.more;
				button.classList.remove( 'loading' );
			}

			document.body.dispatchEvent( new Event( 'post-load' ) );
		} );

		infiniteScroll.on( 'last', function() {
			var loadMore = document.querySelector( '.load-more' );

			if ( loadMore ) {
				loadMore.style.display = 'none';
			}
		} );
	}
} );
