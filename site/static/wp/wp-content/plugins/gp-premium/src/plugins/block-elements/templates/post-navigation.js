import {
	_x,
} from '@wordpress/i18n';

const templates = {
	template_1: {
		label: _x( 'Two columns with featured image', 'label', 'gp-premium' ),
		thumbnail: 'post-navigation-featured-images-1.jpg',
		content: '<!-- wp:generateblocks/container {"uniqueId":"99fe8eb7","paddingTop":"0","paddingRight":"0","paddingBottom":"0","paddingLeft":"0","isDynamic":true} --> <!-- wp:generateblocks/grid {"uniqueId":"7b27c819","columns":2,"isDynamic":true} --> <!-- wp:generateblocks/container {"uniqueId":"8e5dc8f7","isGrid":true,"gridId":"ee9eb157","paddingTop":"0","paddingRight":"0","paddingBottom":"0","paddingLeft":"0","marginBottomMobile":"10","isDynamic":true,"gpRemoveContainerCondition":"no-previous-post"} --> <!-- wp:generateblocks/grid {"uniqueId":"e2b84192","columns":2,"horizontalGap":15,"verticalAlignment":"center","isDynamic":true} --> <!-- wp:generateblocks/container {"uniqueId":"6aed9546","isGrid":true,"gridId":"fa4d77e4","width":25,"widthMobile":25,"paddingTop":"0","paddingRight":"0","paddingBottom":"0","paddingLeft":"0","isDynamic":true} --> <!-- wp:generatepress/dynamic-image {"imageType":"featured-image","imageSource":"previous-post","imageSize":"thumbnail","linkTo":"single-post","imageWidth":100,"imageHeight":100,"avatarSize":100} /--> <!-- /wp:generateblocks/container --> <!-- wp:generateblocks/container {"uniqueId":"d54a6460","isGrid":true,"gridId":"fa4d77e4","width":75,"widthMobile":75,"paddingTop":"0","paddingRight":"0","paddingBottom":"0","paddingLeft":"0","isDynamic":true} --> <!-- wp:generateblocks/headline {"uniqueId":"0d00c744","element":"p","marginBottom":"5","gpDynamicTextType":"title","gpDynamicLinkType":"single-post","gpDynamicTextReplace":"Previous post title","gpDynamicSource":"previous-post"} --> <p class="gb-headline gb-headline-0d00c744 gb-headline-text">Previous post title</p> <!-- /wp:generateblocks/headline --> <!-- wp:generateblocks/headline {"uniqueId":"86e1ad46","element":"p","showAdvancedTypography":true,"fontSize":14,"marginBottom":"0","gpDynamicTextType":"post-author","gpDynamicLinkType":"author-archives","gpDynamicTextReplace":"Author name","gpDynamicSource":"previous-post","gpDynamicTextBefore":"by "} --> <p class="gb-headline gb-headline-86e1ad46 gb-headline-text">Author name</p> <!-- /wp:generateblocks/headline --> <!-- /wp:generateblocks/container --> <!-- /wp:generateblocks/grid --> <!-- /wp:generateblocks/container --> <!-- wp:generateblocks/container {"uniqueId":"2540358d","isGrid":true,"gridId":"ee9eb157","paddingTop":"0","paddingRight":"0","paddingBottom":"0","paddingLeft":"0","alignmentMobile":"left","isDynamic":true,"gpRemoveContainerCondition":"no-next-post"} --> <!-- wp:generateblocks/grid {"uniqueId":"6e69ba24","columns":2,"horizontalGap":15,"verticalAlignment":"center","isDynamic":true} --> <!-- wp:generateblocks/container {"uniqueId":"daa456b5","isGrid":true,"gridId":"fa4d77e4","width":75,"widthMobile":75,"paddingTop":"0","paddingRight":"0","paddingBottom":"0","paddingLeft":"0","alignment":"right","alignmentMobile":"left","isDynamic":true} --> <!-- wp:generateblocks/headline {"uniqueId":"2883b2a4","element":"p","marginBottom":"5","gpDynamicTextType":"title","gpDynamicLinkType":"single-post","gpDynamicTextReplace":"Next post title","gpDynamicSource":"next-post"} --> <p class="gb-headline gb-headline-2883b2a4 gb-headline-text">Next post title</p> <!-- /wp:generateblocks/headline --> <!-- wp:generateblocks/headline {"uniqueId":"3d2e07c6","element":"p","showAdvancedTypography":true,"fontSize":14,"marginBottom":"0","gpDynamicTextType":"post-author","gpDynamicLinkType":"author-archives","gpDynamicTextReplace":"Author name","gpDynamicSource":"next-post","gpDynamicTextBefore":"by "} --> <p class="gb-headline gb-headline-3d2e07c6 gb-headline-text">Author name</p> <!-- /wp:generateblocks/headline --> <!-- /wp:generateblocks/container --> <!-- wp:generateblocks/container {"uniqueId":"2634cdf9","isGrid":true,"gridId":"fa4d77e4","width":25,"widthMobile":25,"orderMobile":-1,"paddingTop":"0","paddingRight":"0","paddingBottom":"0","paddingLeft":"0","isDynamic":true} --> <!-- wp:generatepress/dynamic-image {"imageType":"featured-image","imageSource":"next-post","imageSize":"thumbnail","linkTo":"single-post","imageWidth":100,"imageHeight":100,"avatarSize":100} /--> <!-- /wp:generateblocks/container --> <!-- /wp:generateblocks/grid --> <!-- /wp:generateblocks/container --> <!-- /wp:generateblocks/grid --> <!-- /wp:generateblocks/container -->',
		meta: [
			{ key: '_generate_hook', value: 'generate_after_do_template_part' },
			{ key: '_generate_hook_priority', value: '1' },
			{ key: '_generate_disable_post_navigation', value: true },
			{ key: '_generate_use_archive_navigation_container', value: true },
		],
	},
	template_2: {
		label: _x( 'Two columns with arrows', 'label', 'gp-premium' ),
		thumbnail: 'post-navigation-arrows-1.jpg',
		content: '<!-- wp:generateblocks/container {"uniqueId":"d1dd99b1","paddingTop":"20","paddingRight":"0","paddingBottom":"20","paddingLeft":"0","isDynamic":true} --> <!-- wp:generateblocks/grid {"uniqueId":"a4b97d6a","columns":2,"isDynamic":true} --> <!-- wp:generateblocks/container {"uniqueId":"9c89f761","isGrid":true,"gridId":"ee9eb157","paddingTop":"0","paddingRight":"0","paddingBottom":"0","paddingLeft":"0","marginBottomMobile":"10","isDynamic":true,"gpRemoveContainerCondition":"no-previous-post"} --> <!-- wp:generateblocks/grid {"uniqueId":"c04126aa","columns":2,"horizontalGap":15,"isDynamic":true} --> <!-- wp:generateblocks/container {"uniqueId":"9cf413a8","isGrid":true,"gridId":"fa4d77e4","width":15,"widthTablet":25,"widthMobile":15,"paddingTop":"0","paddingRight":"0","paddingBottom":"0","paddingLeft":"0","isDynamic":true} --> <!-- wp:generateblocks/button-container {"uniqueId":"38a2c075","fillHorizontalSpace":true,"isDynamic":true} --> <!-- wp:generateblocks/button {"uniqueId":"bec8d56e","hasUrl":true,"hasIcon":true,"removeText":true,"backgroundColor":"#000000","textColor":"#ffffff","backgroundColorHover":"#abb8c3","textColorHover":"","paddingTop":"10","paddingRight":"10","paddingBottom":"10","paddingLeft":"10","iconSize":1.5,"gpDynamicLinkType":"single-post","gpDynamicSource":"previous-post"} --> <a class="gb-button gb-button-bec8d56e" href="#"><span class="gb-icon"><svg aria-hidden="true" height="1em" width="1em" viewBox="0 0 256 512" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M31.7 239l136-136c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9L127.9 256l96.4 96.4c9.4 9.4 9.4 24.6 0 33.9L201.7 409c-9.4 9.4-24.6 9.4-33.9 0l-136-136c-9.5-9.4-9.5-24.6-.1-34z"></path></svg></span></a> <!-- /wp:generateblocks/button --> <!-- /wp:generateblocks/button-container --> <!-- /wp:generateblocks/container --> <!-- wp:generateblocks/container {"uniqueId":"625f3305","isGrid":true,"gridId":"fa4d77e4","width":85,"widthTablet":75,"widthMobile":85,"paddingTop":"0","paddingRight":"0","paddingBottom":"0","paddingLeft":"0","isDynamic":true} --> <!-- wp:generateblocks/headline {"uniqueId":"a6f36397","element":"p","marginBottom":"0","gpDynamicTextType":"title","gpDynamicLinkType":"single-post","gpDynamicTextReplace":"Previous post title","gpDynamicSource":"previous-post"} --> <p class="gb-headline gb-headline-a6f36397 gb-headline-text">Previous post title</p> <!-- /wp:generateblocks/headline --> <!-- wp:generateblocks/headline {"uniqueId":"3d262c0b","element":"p","showAdvancedTypography":true,"fontSize":14,"marginBottom":"0","gpDynamicTextType":"post-date","gpDynamicTextReplace":"Date","gpDynamicSource":"previous-post","gpDynamicDateUpdated":true} --> <p class="gb-headline gb-headline-3d262c0b gb-headline-text">Date</p> <!-- /wp:generateblocks/headline --> <!-- /wp:generateblocks/container --> <!-- /wp:generateblocks/grid --> <!-- /wp:generateblocks/container --> <!-- wp:generateblocks/container {"uniqueId":"5d70717c","isGrid":true,"gridId":"ee9eb157","paddingTop":"0","paddingRight":"0","paddingBottom":"0","paddingLeft":"0","alignment":"right","alignmentMobile":"left","isDynamic":true,"gpRemoveContainerCondition":"no-next-post"} --> <!-- wp:generateblocks/grid {"uniqueId":"ee647ff2","columns":2,"horizontalGap":15,"isDynamic":true} --> <!-- wp:generateblocks/container {"uniqueId":"78f3ead4","isGrid":true,"gridId":"fa4d77e4","width":85,"widthTablet":75,"widthMobile":85,"paddingTop":"0","paddingRight":"0","paddingBottom":"0","paddingLeft":"0","isDynamic":true} --> <!-- wp:generateblocks/headline {"uniqueId":"643cf12f","element":"p","marginBottom":"0","gpDynamicTextType":"title","gpDynamicLinkType":"single-post","gpDynamicTextReplace":"Next post title","gpDynamicSource":"next-post"} --> <p class="gb-headline gb-headline-643cf12f gb-headline-text">Next post title</p> <!-- /wp:generateblocks/headline --> <!-- wp:generateblocks/headline {"uniqueId":"8ac35083","element":"p","showAdvancedTypography":true,"fontSize":14,"marginBottom":"0","gpDynamicTextType":"post-date","gpDynamicTextReplace":"Date","gpDynamicSource":"next-post","gpDynamicDateUpdated":true} --> <p class="gb-headline gb-headline-8ac35083 gb-headline-text">Date</p> <!-- /wp:generateblocks/headline --> <!-- /wp:generateblocks/container --> <!-- wp:generateblocks/container {"uniqueId":"780c810b","isGrid":true,"gridId":"fa4d77e4","width":15,"widthTablet":25,"widthMobile":15,"orderMobile":-1,"paddingTop":"0","paddingRight":"0","paddingBottom":"0","paddingLeft":"0","isDynamic":true} --> <!-- wp:generateblocks/button-container {"uniqueId":"fe863527","fillHorizontalSpace":true,"isDynamic":true} --> <!-- wp:generateblocks/button {"uniqueId":"122d9fa4","hasUrl":true,"hasIcon":true,"removeText":true,"backgroundColor":"#000000","textColor":"#ffffff","backgroundColorHover":"#abb8c3","textColorHover":"","paddingTop":"10","paddingRight":"10","paddingBottom":"10","paddingLeft":"10","iconSize":1.5,"gpDynamicLinkType":"single-post","gpDynamicSource":"next-post"} --> <a class="gb-button gb-button-122d9fa4" href="#"><span class="gb-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512" width="1em" height="1em" aria-hidden="true"><path d="M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9 0l-22.6-22.6c-9.4-9.4-9.4-24.6 0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6.1 34z" fill="currentColor"></path></svg></span></a> <!-- /wp:generateblocks/button --> <!-- /wp:generateblocks/button-container --> <!-- /wp:generateblocks/container --> <!-- /wp:generateblocks/grid --> <!-- /wp:generateblocks/container --> <!-- /wp:generateblocks/grid --> <!-- /wp:generateblocks/container -->',
		meta: [
			{ key: '_generate_hook', value: 'generate_after_do_template_part' },
			{ key: '_generate_hook_priority', value: '1' },
			{ key: '_generate_disable_post_navigation', value: true },
			{ key: '_generate_use_archive_navigation_container', value: true },
		],
	},
	template_3: {
		label: _x( 'Two columns with background overlays', 'label', 'gp-premium' ),
		thumbnail: 'post-navigation-overlay.jpg',
		content: '<!-- wp:generateblocks/container {"uniqueId":"aadd0a6f","paddingTop":"0","paddingRight":"0","paddingBottom":"0","paddingLeft":"0","paddingSyncUnits":true,"isDynamic":true} --> <!-- wp:generateblocks/grid {"uniqueId":"fe8855c5","columns":2,"horizontalGap":0,"isDynamic":true} --> <!-- wp:generateblocks/container {"uniqueId":"59edc08b","isGrid":true,"gridId":"fe8855c5","paddingTop":"40","paddingRight":"40","paddingBottom":"40","paddingLeft":"40","paddingSyncUnits":true,"backgroundColor":"#000000","textColor":"#ffffff","linkColor":"#ffffff","linkColorHover":"#e3e3e3","bgImage":{"id":"","image":{"url":"#dynamic-background-image"}},"bgOptions":{"selector":"pseudo-element","opacity":0.4,"overlay":false,"position":"center center","size":"cover","repeat":"no-repeat","attachment":""},"isDynamic":true,"gpDynamicImageBg":"featured-image","gpDynamicSource":"previous-post","gpRemoveContainerCondition":"no-previous-post"} --> <!-- wp:generateblocks/headline {"uniqueId":"8d3d4c12","element":"p","backgroundColor":"#cf2e2e","showAdvancedTypography":true,"fontSize":14,"textTransform":"uppercase","paddingTop":"5","paddingRight":"10","paddingBottom":"5","paddingLeft":"10","inlineWidth":true} --> <p class="gb-headline gb-headline-8d3d4c12 gb-headline-text">Previous</p> <!-- /wp:generateblocks/headline --> <!-- wp:generateblocks/headline {"uniqueId":"352592d1","element":"h3","showAdvancedTypography":true,"fontSize":25,"marginBottom":"0","className":"","gpDynamicTextType":"title","gpDynamicLinkType":"single-post","gpDynamicTextReplace":"Hello World","gpDynamicSource":"previous-post"} --> <h3 class="gb-headline gb-headline-352592d1 gb-headline-text ">Hello World</h3> <!-- /wp:generateblocks/headline --> <!-- /wp:generateblocks/container --> <!-- wp:generateblocks/container {"uniqueId":"993a41e4","isGrid":true,"gridId":"fe8855c5","paddingTop":"40","paddingRight":"40","paddingBottom":"40","paddingLeft":"40","paddingSyncUnits":true,"backgroundColor":"#000000","textColor":"#ffffff","linkColor":"#ffffff","linkColorHover":"#e3e3e3","bgImage":{"id":"","image":{"url":"#dynamic-background-image"}},"bgOptions":{"selector":"pseudo-element","opacity":0.4,"overlay":false,"position":"center center","size":"cover","repeat":"no-repeat","attachment":""},"isDynamic":true,"gpDynamicImageBg":"featured-image","gpDynamicSource":"next-post","gpRemoveContainerCondition":"no-next-post"} --> <!-- wp:generateblocks/headline {"uniqueId":"49c8845f","element":"p","backgroundColor":"#cf2e2e","showAdvancedTypography":true,"fontSize":14,"textTransform":"uppercase","paddingTop":"5","paddingRight":"10","paddingBottom":"5","paddingLeft":"10","inlineWidth":true} --> <p class="gb-headline gb-headline-49c8845f gb-headline-text">Next</p> <!-- /wp:generateblocks/headline --> <!-- wp:generateblocks/headline {"uniqueId":"6ba8079e","element":"h3","showAdvancedTypography":true,"fontSize":25,"marginBottom":"0","className":"","gpDynamicTextType":"title","gpDynamicLinkType":"single-post","gpDynamicTextReplace":"Hello World","gpDynamicSource":"next-post"} --> <h3 class="gb-headline gb-headline-6ba8079e gb-headline-text ">Hello World</h3> <!-- /wp:generateblocks/headline --> <!-- /wp:generateblocks/container --> <!-- /wp:generateblocks/grid --> <!-- /wp:generateblocks/container -->',
		meta: [
			{ key: '_generate_hook', value: 'generate_after_do_template_part' },
			{ key: '_generate_hook_priority', value: '1' },
			{ key: '_generate_disable_post_navigation', value: true },
			{ key: '_generate_use_archive_navigation_container', value: false },
		],
	},
	template_4: {
		label: _x( 'Two columns with arrows', 'label', 'gp-premium' ),
		thumbnail: 'post-navigation-arrows-2.jpg',
		content: '<!-- wp:generateblocks/container {"uniqueId":"96f5f0fa","innerContainer":"full","paddingTop":"0","paddingRight":"0","paddingBottom":"0","paddingLeft":"0","paddingSyncUnits":true,"isDynamic":true} --> <!-- wp:generateblocks/grid {"uniqueId":"4785bcc3","columns":2,"horizontalGap":0,"isDynamic":true} --> <!-- wp:generateblocks/container {"uniqueId":"5287d6da","isGrid":true,"gridId":"4785bcc3","paddingTop":"30","paddingRight":"0","paddingBottom":"25","paddingLeft":"25","backgroundColor":"#ffffff","isDynamic":true,"gpRemoveContainerCondition":"no-previous-post","opacities":[],"textShadows":[{"state":"normal","target":"self","customSelector":"","color":"#000000","colorOpacity":0.5,"xOffset":5,"yOffset":5,"blur":10}]} --> <!-- wp:generateblocks/grid {"uniqueId":"261aea9d","columns":2,"horizontalGap":0,"isDynamic":true} --> <!-- wp:generateblocks/container {"uniqueId":"eb3b7005","isGrid":true,"gridId":"261aea9d","width":75,"paddingTop":"0","paddingRight":"0","paddingBottom":"0","paddingLeft":"0","alignment":"left","isDynamic":true} --> <!-- wp:generateblocks/headline {"uniqueId":"0a2d5bfc","element":"h3","alignment":"left","textColor":"#000000","linkColor":"#000000","gpDynamicTextType":"title","gpDynamicLinkType":"single-post","gpDynamicTextReplace":"Hello World","gpDynamicSource":"previous-post"} --> <h3 class="gb-headline gb-headline-0a2d5bfc gb-headline-text">Hello World</h3> <!-- /wp:generateblocks/headline --> <!-- wp:generateblocks/headline {"uniqueId":"164ae39e","element":"p","showAdvancedTypography":true,"fontSize":14,"marginBottom":"0","hasIcon":true,"gpDynamicTextType":"comments-number","gpDynamicLinkType":"comments","gpDynamicTextReplace":"Comments number","gpDynamicSource":"previous-post"} --> <p class="gb-headline gb-headline-164ae39e"><span class="gb-icon"><svg aria-hidden="true" height="1em" width="1em" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M464 64H48C21.49 64 0 85.49 0 112v288c0 26.51 21.49 48 48 48h416c26.51 0 48-21.49 48-48V112c0-26.51-21.49-48-48-48zm0 48v40.805c-22.422 18.259-58.168 46.651-134.587 106.49-16.841 13.247-50.201 45.072-73.413 44.701-23.208.375-56.579-31.459-73.413-44.701C106.18 199.465 70.425 171.067 48 152.805V112h416zM48 400V214.398c22.914 18.251 55.409 43.862 104.938 82.646 21.857 17.205 60.134 55.186 103.062 54.955 42.717.231 80.509-37.199 103.053-54.947 49.528-38.783 82.032-64.401 104.947-82.653V400H48z"></path></svg></span><span class="gb-headline-text">Comments number</span></p> <!-- /wp:generateblocks/headline --> <!-- /wp:generateblocks/container --> <!-- wp:generateblocks/container {"uniqueId":"75cd654a","isGrid":true,"gridId":"261aea9d","width":25,"paddingTop":"0","paddingRight":"0","paddingBottom":"0","paddingLeft":"0","alignment":"right","isDynamic":true} --> <!-- wp:generateblocks/button-container {"uniqueId":"2cf8ccdf","alignment":"right","stack":true,"isDynamic":true} --> <!-- wp:generateblocks/button {"uniqueId":"6acb0e83","hasUrl":true,"hasIcon":true,"removeText":true,"backgroundColor":"#0366d6","textColor":"#ffffff","backgroundColorHover":"#222222","textColorHover":"#ffffff","paddingTop":"15","paddingRight":"20","paddingBottom":"15","paddingLeft":"20","gpDynamicLinkType":"single-post","gpDynamicSource":"previous-post"} --> <a class="gb-button gb-button-6acb0e83" href="#"><span class="gb-icon"><svg aria-hidden="true" height="1em" width="1em" viewBox="0 0 256 512" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M31.7 239l136-136c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9L127.9 256l96.4 96.4c9.4 9.4 9.4 24.6 0 33.9L201.7 409c-9.4 9.4-24.6 9.4-33.9 0l-136-136c-9.5-9.4-9.5-24.6-.1-34z"></path></svg></span></a> <!-- /wp:generateblocks/button --> <!-- /wp:generateblocks/button-container --> <!-- /wp:generateblocks/container --> <!-- /wp:generateblocks/grid --> <!-- /wp:generateblocks/container --> <!-- wp:generateblocks/container {"uniqueId":"7af8fa61","isGrid":true,"gridId":"4785bcc3","paddingTop":"30","paddingRight":"25","paddingBottom":"25","paddingLeft":"0","backgroundColor":"#0366d6","isDynamic":true,"gpRemoveContainerCondition":"no-next-post"} --> <!-- wp:generateblocks/grid {"uniqueId":"1161e4d4","columns":2,"horizontalGap":0,"isDynamic":true} --> <!-- wp:generateblocks/container {"uniqueId":"045e1698","isGrid":true,"gridId":"261aea9d","width":25,"paddingTop":"0","paddingRight":"0","paddingBottom":"0","paddingLeft":"0","alignment":"left","isDynamic":true} --> <!-- wp:generateblocks/button-container {"uniqueId":"b5e0b3c6","alignment":"left","stack":true,"isDynamic":true} --> <!-- wp:generateblocks/button {"uniqueId":"557abb73","hasUrl":true,"hasIcon":true,"removeText":true,"backgroundColor":"#ffffff","textColor":"#0693e3","backgroundColorHover":"#222222","textColorHover":"#ffffff","paddingTop":"15","paddingRight":"20","paddingBottom":"15","paddingLeft":"20","gpDynamicLinkType":"single-post","gpDynamicSource":"next-post"} --> <a class="gb-button gb-button-557abb73" href="#"><span class="gb-icon"><svg aria-hidden="true" height="1em" width="1em" viewBox="0 0 256 512" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9 0l-22.6-22.6c-9.4-9.4-9.4-24.6 0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6.1 34z"></path></svg></span></a> <!-- /wp:generateblocks/button --> <!-- /wp:generateblocks/button-container --> <!-- /wp:generateblocks/container --> <!-- wp:generateblocks/container {"uniqueId":"9ad09f6f","isGrid":true,"gridId":"261aea9d","width":75,"paddingTop":"0","paddingRight":"0","paddingBottom":"0","paddingLeft":"0","alignment":"right","isDynamic":true} --> <!-- wp:generateblocks/headline {"uniqueId":"9ba9e9d1","element":"h3","alignment":"right","textColor":"#ffffff","linkColor":"#ffffff","gpDynamicTextType":"title","gpDynamicLinkType":"single-post","gpDynamicTextReplace":"Hello World","gpDynamicSource":"next-post"} --> <h3 class="gb-headline gb-headline-9ba9e9d1 gb-headline-text">Hello World</h3> <!-- /wp:generateblocks/headline --> <!-- /wp:generateblocks/container --> <!-- /wp:generateblocks/grid --> <!-- wp:generateblocks/headline {"uniqueId":"8ebf8dbe","element":"p","alignment":"right","textColor":"#ffffff","linkColor":"#ffffff","showAdvancedTypography":true,"fontSize":14,"marginBottom":"0","hasIcon":true,"gpDynamicTextType":"comments-number","gpDynamicLinkType":"comments","gpDynamicTextReplace":"Comments number","gpDynamicSource":"next-post"} --> <p class="gb-headline gb-headline-8ebf8dbe"><span class="gb-icon"><svg aria-hidden="true" height="1em" width="1em" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M464 64H48C21.49 64 0 85.49 0 112v288c0 26.51 21.49 48 48 48h416c26.51 0 48-21.49 48-48V112c0-26.51-21.49-48-48-48zm0 48v40.805c-22.422 18.259-58.168 46.651-134.587 106.49-16.841 13.247-50.201 45.072-73.413 44.701-23.208.375-56.579-31.459-73.413-44.701C106.18 199.465 70.425 171.067 48 152.805V112h416zM48 400V214.398c22.914 18.251 55.409 43.862 104.938 82.646 21.857 17.205 60.134 55.186 103.062 54.955 42.717.231 80.509-37.199 103.053-54.947 49.528-38.783 82.032-64.401 104.947-82.653V400H48z"></path></svg></span><span class="gb-headline-text">Comments number</span></p> <!-- /wp:generateblocks/headline --> <!-- /wp:generateblocks/container --> <!-- /wp:generateblocks/grid --> <!-- /wp:generateblocks/container -->',
		meta: [
			{ key: '_generate_hook', value: 'generate_after_do_template_part' },
			{ key: '_generate_hook_priority', value: '1' },
			{ key: '_generate_disable_post_navigation', value: true },
			{ key: '_generate_use_archive_navigation_container', value: false },
		],
	},
	template_5: {
		label: _x( 'Two columsn with featured image offset', 'label', 'gp-premim' ),
		thumbnail: 'post-navigation-offset.jpg',
		content: '<!-- wp:generateblocks/container {"uniqueId":"52018004","innerContainer":"full","paddingTop":"0","paddingRight":"0","paddingBottom":"0","paddingLeft":"0","marginRight":"30","marginLeft":"30","marginLeftTablet":"30","marginRightMobile":"25","marginLeftMobile":"25","alignment":"right","isDynamic":true} --> <!-- wp:generateblocks/grid {"uniqueId":"7bdd6853","columns":4,"horizontalGap":0,"verticalGapMobile":0,"isDynamic":true} --> <!-- wp:generateblocks/container {"uniqueId":"4138dd74","isGrid":true,"gridId":"7bdd6853","width":25,"widthTablet":50,"widthMobile":50,"paddingTop":"0","paddingRight":"0","paddingBottom":"0","paddingLeft":"0","borderRadiusBottomLeft":"10","borderRadiusTopLeft":"10","borderRadiusBottomLeftTablet":"0","borderRadiusBottomLeftMobile":"0","borderRadiusTopLeftMobile":"5","bgImage":{"id":"","image":{"url":"https://generatepress.local/wp-content/plugins/gp-premium/elements/assets/admin/background-image-fallback.jpg"}},"verticalAlignment":"center","isDynamic":true,"gpDynamicImageBg":"featured-image","gpDynamicLinkType":"post","gpDynamicSource":"previous-post","gpRemoveContainerCondition":"no-previous-post"} --> <!-- wp:generateblocks/button-container {"uniqueId":"776ec4d6","isDynamic":true} --> <!-- wp:generateblocks/button {"uniqueId":"a3aaad4c","hasUrl":true,"hasIcon":true,"removeText":true,"backgroundColor":"#b5b5b5","textColor":"#ffffff","backgroundColorHover":"#222222","textColorHover":"#ffffff","borderColor":"#f9f9f9","marginRight":"1.5","marginLeft":"-1.5","marginUnit":"em","paddingTop":"15","paddingRight":"15","paddingBottom":"15","paddingLeft":"15","borderSizeTop":"7","borderSizeRight":"7","borderSizeBottom":"7","borderSizeLeft":"7","borderRadiusTopRight":"100","borderRadiusBottomRight":"100","borderRadiusBottomLeft":"100","borderRadiusTopLeft":"100","borderRadiusUnit":"%","iconSizeMobile":0.8,"gpDynamicLinkType":"single-post","gpDynamicSource":"previous-post"} --> <a class="gb-button gb-button-a3aaad4c" href="#"><span class="gb-icon"><svg aria-hidden="true" height="1em" width="1em" viewBox="0 0 256 512" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M31.7 239l136-136c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9L127.9 256l96.4 96.4c9.4 9.4 9.4 24.6 0 33.9L201.7 409c-9.4 9.4-24.6 9.4-33.9 0l-136-136c-9.5-9.4-9.5-24.6-.1-34z"></path></svg></span></a> <!-- /wp:generateblocks/button --> <!-- /wp:generateblocks/button-container --> <!-- /wp:generateblocks/container --> <!-- wp:generateblocks/container {"uniqueId":"18430adf","isGrid":true,"gridId":"7bdd6853","width":25,"widthTablet":50,"widthMobile":50,"paddingTop":"30","paddingRight":"30","paddingBottom":"30","paddingLeft":"30","paddingSyncUnits":true,"paddingTopMobile":"10","paddingRightMobile":"10","paddingBottomMobile":"10","paddingLeftMobile":"10","marginRight":"10","marginRightTablet":"0","marginRightMobile":"0","borderRadiusTopRight":"10","borderRadiusBottomRight":"10","borderRadiusBottomRightTablet":"0","borderRadiusTopRightMobile":"5","borderRadiusBottomRightMobile":"0","backgroundColor":"#ffffff","zindex":2,"alignment":"center","isDynamic":true,"gpDynamicImageBg":"featured-image","gpDynamicSource":"previous-post","gpRemoveContainerCondition":"no-previous-post"} --> <!-- wp:generateblocks/headline {"uniqueId":"2acc62a4","element":"h3","alignment":"left","backgroundColor":"#ffffff","textColor":"#000000","linkColor":"#000000","showAdvancedTypography":true,"fontSize":25,"fontSizeMobile":17,"marginBottom":"0","marginLeft":"-4","marginUnit":"em","marginLeftMobile":"-3","paddingTop":"10","paddingRight":"10","paddingBottom":"10","paddingLeft":"10","paddingSyncUnits":true,"borderRadiusBottomLeft":"10","borderRadiusTopLeft":"10","borderRadiusTopRightMobile":"5","borderRadiusBottomRightMobile":"5","borderRadiusBottomLeftMobile":"5","borderRadiusTopLeftMobile":"5","gpDynamicTextType":"title","gpDynamicLinkType":"single-post","gpDynamicTextReplace":"Hello World","gpDynamicSource":"previous-post"} --> <h3 class="gb-headline gb-headline-2acc62a4 gb-headline-text">Hello World</h3> <!-- /wp:generateblocks/headline --> <!-- /wp:generateblocks/container --> <!-- wp:generateblocks/container {"uniqueId":"ce9878f4","isGrid":true,"gridId":"7bdd6853","width":25,"widthTablet":50,"widthMobile":50,"paddingTop":"30","paddingRight":"30","paddingBottom":"30","paddingLeft":"30","paddingSyncUnits":true,"paddingTopMobile":"10","paddingRightMobile":"10","paddingBottomMobile":"10","paddingLeftMobile":"10","marginLeft":"10","marginLeftTablet":"0","marginLeftMobile":"0","borderRadiusBottomLeft":"10","borderRadiusTopLeft":"10","borderRadiusTopLeftTablet":"0","borderRadiusBottomLeftMobile":"5","borderRadiusTopLeftMobile":"0","backgroundColor":"#ffffff","zindex":1,"alignment":"center","isDynamic":true,"gpDynamicImageBg":"featured-image","gpDynamicSource":"next-post","gpRemoveContainerCondition":"no-next-post"} --> <!-- wp:generateblocks/headline {"uniqueId":"9d97a37f","element":"h3","alignment":"right","backgroundColor":"#ffffff","textColor":"#000000","linkColor":"#000000","showAdvancedTypography":true,"fontSize":25,"fontSizeMobile":17,"marginRight":"-4","marginBottom":"0","marginUnit":"em","marginRightMobile":"-3","paddingTop":"10","paddingRight":"10","paddingBottom":"10","paddingLeft":"10","paddingSyncUnits":true,"borderRadiusTopRight":"10","borderRadiusBottomRight":"10","borderRadiusTopRightMobile":"5","borderRadiusBottomRightMobile":"5","borderRadiusBottomLeftMobile":"5","borderRadiusTopLeftMobile":"5","gpDynamicTextType":"title","gpDynamicLinkType":"single-post","gpDynamicTextReplace":"Hello World","gpDynamicSource":"next-post"} --> <h3 class="gb-headline gb-headline-9d97a37f gb-headline-text">Hello World</h3> <!-- /wp:generateblocks/headline --> <!-- /wp:generateblocks/container --> <!-- wp:generateblocks/container {"uniqueId":"6c856070","isGrid":true,"gridId":"7bdd6853","width":25,"widthTablet":50,"widthMobile":50,"paddingTop":"0","paddingRight":"0","paddingBottom":"0","paddingLeft":"0","borderRadiusTopRight":"10","borderRadiusBottomRight":"10","borderRadiusTopRightTablet":"0","borderRadiusTopRightMobile":"0","borderRadiusBottomRightMobile":"5","bgImage":{"id":"","image":{"url":"https://generatepress.local/wp-content/plugins/gp-premium/elements/assets/admin/background-image-fallback.jpg"}},"verticalAlignment":"center","isDynamic":true,"gpDynamicImageBg":"featured-image","gpDynamicSource":"next-post","gpRemoveContainerCondition":"no-next-post"} --> <!-- wp:generateblocks/button-container {"uniqueId":"ad40b681","alignment":"right","isDynamic":true} --> <!-- wp:generateblocks/button {"uniqueId":"139d60e4","hasUrl":true,"hasIcon":true,"removeText":true,"backgroundColor":"#b5b5b5","textColor":"#ffffff","backgroundColorHover":"#222222","textColorHover":"#ffffff","borderColor":"#f9f9f9","marginRight":"-1.5","marginLeft":"1.5","marginUnit":"em","paddingTop":"15","paddingRight":"15","paddingBottom":"15","paddingLeft":"15","borderSizeTop":"7","borderSizeRight":"7","borderSizeBottom":"7","borderSizeLeft":"7","borderRadiusTopRight":"100","borderRadiusBottomRight":"100","borderRadiusBottomLeft":"100","borderRadiusTopLeft":"100","borderRadiusUnit":"%","iconSizeMobile":0.8,"gpDynamicLinkType":"single-post","gpDynamicSource":"next-post","opacities":[],"transitions":[],"boxShadows":[],"transforms":[],"textShadows":[],"filters":[]} --> <a class="gb-button gb-button-139d60e4" href="#"><span class="gb-icon"><svg aria-hidden="true" height="1em" width="1em" viewBox="0 0 256 512" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9 0l-22.6-22.6c-9.4-9.4-9.4-24.6 0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6.1 34z"></path></svg></span></a> <!-- /wp:generateblocks/button --> <!-- /wp:generateblocks/button-container --> <!-- /wp:generateblocks/container --> <!-- /wp:generateblocks/grid --> <!-- /wp:generateblocks/container -->',
		meta: [
			{ key: '_generate_hook', value: 'generate_after_do_template_part' },
			{ key: '_generate_hook_priority', value: '1' },
			{ key: '_generate_disable_post_navigation', value: true },
			{ key: '_generate_use_archive_navigation_container', value: false },
		],
	},
};

export default templates;