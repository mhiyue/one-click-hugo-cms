import {
	_x,
} from '@wordpress/i18n';

const templates = {
	basic_1: {
		label: _x( 'Inline with avatar', 'label', 'gp-premium' ),
		thumbnail: 'post-meta-inline.jpg',
		content: '<!-- wp:generateblocks/container {"uniqueId":"8a25fc79","paddingTop":"15","paddingRight":"0","paddingBottom":"15","paddingLeft":"0","marginTop":"20","marginBottom":"20","borderSizeTop":"1","borderSizeBottom":"1","borderColor":"#e8edf0","showAdvancedTypography":true,"fontSize":14,"isDynamic":true,"gpInlinePostMeta":true} --> <!-- wp:generatepress/dynamic-image {"imageType":"author-avatar","avatarRounded":true} /--> <!-- wp:generateblocks/headline {"uniqueId":"3fb4928a","element":"div","marginLeft":"10","paddingRight":"10","inlineWidth":true,"gpDynamicTextType":"post-author","gpDynamicLinkType":"author-archives","gpDynamicTextReplace":"Author Name"} --> <div class="gb-headline gb-headline-3fb4928a gb-headline-text">Author Name</div> <!-- /wp:generateblocks/headline --> <!-- wp:generateblocks/headline {"uniqueId":"f9b55781","element":"div","borderColor":"#e8edf0","paddingLeft":"10","borderSizeLeft":"1","inlineWidth":true,"gpDynamicTextType":"post-date","gpDynamicTextReplace":"Date"} --> <div class="gb-headline gb-headline-f9b55781 gb-headline-text">Date</div> <!-- /wp:generateblocks/headline --> <!-- wp:generateblocks/headline {"uniqueId":"8fca9ec9","element":"div","borderColor":"#e8edf0","marginLeft":"10","paddingLeft":"10","borderSizeLeft":"1","hasIcon":true,"inlineWidth":true,"gpDynamicTextType":"comments-number","gpDynamicLinkType":"comments","gpDynamicTextReplace":"Comments","gpDynamicTextTaxonomy":"category","gpDynamicNoCommentsText":"0","gpDynamicSingleCommentText":"1","gpDynamicMultipleCommentsText":"%"} --> <div class="gb-headline gb-headline-8fca9ec9"><span class="gb-icon"><svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" width="1em" height="1em" viewBox="0 0 16 16"><path fill="currentColor" d="M14.2 14c.6-.5 1.8-1.6 1.8-3.2 0-1.4-1.2-2.6-2.8-3.3.5-.6.8-1.5.8-2.4C14 2.3 11.1 0 7.4 0 3.9 0 0 2.1 0 5.1c0 2.1 1.6 3.6 2.3 4.2-.1 1.2-.6 1.7-.6 1.7L.5 12H2c1.2 0 2.2-.3 3-.7.3 1.9 2.5 3.4 5.3 3.4h.5c.6.5 1.8 1.3 3.5 1.3h1.4l-1.1-.9s-.3-.3-.4-1.1zm-3.9-.3C8 13.7 6 12.4 6 10.9v-.2c.2-.2.4-.3.5-.5h.7c2.1 0 4-.7 5.2-1.9 1.5.5 2.6 1.5 2.6 2.5s-.9 2-1.7 2.5l-.3.2v.3c0 .5.2.8.3 1.1-1-.2-1.7-.7-1.9-1l-.1-.2h-1zM7.4 1C10.5 1 13 2.9 13 5.1s-2.6 4.1-5.8 4.1H6.1l-.1.2c-.3.4-1.5 1.2-3.1 1.5.1-.4.1-1 .1-1.8v-.3C2 8 .9 6.6.9 5.2.9 3 4.1 1 7.4 1z"></path></svg></span><span class="gb-headline-text">Comments</span></div> <!-- /wp:generateblocks/headline --> <!-- /wp:generateblocks/container -->',
		meta: [
			{ key: '_generate_post_meta_location', value: 'after-post-title' },
			{ key: '_generate_disable_primary_post_meta', value: true },
		],
	},
	basic_2: {
		label: _x( 'Stacked with avatar', 'label', 'gp-premium' ),
		thumbnail: 'post-meta-avatar-stacked.jpg',
		content: '<!-- wp:generateblocks/container {"uniqueId":"a745be15","paddingTop":"20","paddingRight":"0","paddingBottom":"20","paddingLeft":"0","showAdvancedTypography":true,"fontSize":14,"isDynamic":true} --> <!-- wp:generateblocks/grid {"uniqueId":"fe4d27a3","columns":2,"horizontalGap":15,"verticalAlignment":"center","isDynamic":true} --> <!-- wp:generateblocks/container {"uniqueId":"fd4592f4","isGrid":true,"gridId":"fe4d27a3","width":10,"paddingTop":"0","paddingRight":"0","paddingBottom":"0","paddingLeft":"0","isDynamic":true} --> <!-- wp:generatepress/dynamic-image {"imageType":"author-avatar","avatarSize":120} /--> <!-- /wp:generateblocks/container --> <!-- wp:generateblocks/container {"uniqueId":"137e86ad","isGrid":true,"gridId":"fe4d27a3","width":90,"paddingTop":"0","paddingRight":"0","paddingBottom":"0","paddingLeft":"0","isDynamic":true} --> <!-- wp:generateblocks/headline {"uniqueId":"d7bb0434","element":"p","marginBottom":"5","gpDynamicTextType":"post-author","gpDynamicLinkType":"author-archives","gpDynamicTextReplace":"Author Name"} --> <p class="gb-headline gb-headline-d7bb0434 gb-headline-text">Author Name</p> <!-- /wp:generateblocks/headline --> <!-- wp:generateblocks/headline {"uniqueId":"759ebd2f","element":"p","marginBottom":"0","gpDynamicTextType":"post-date","gpDynamicTextReplace":"Date","gpDynamicDateUpdated":true} --> <p class="gb-headline gb-headline-759ebd2f gb-headline-text">Date</p> <!-- /wp:generateblocks/headline --> <!-- /wp:generateblocks/container --> <!-- /wp:generateblocks/grid --> <!-- /wp:generateblocks/container -->',
		meta: [
			{ key: '_generate_post_meta_location', value: 'after-post-title' },
			{ key: '_generate_disable_primary_post_meta', value: true },
		],
	},
	basic_3: {
		label: _x( 'Term buttons', 'label', 'gp-premium' ),
		thumbnail: 'post-meta-term-buttons.jpg',
		content: '<!-- wp:generateblocks/container {"uniqueId":"7134d7c2","paddingTop":"0","paddingRight":"0","paddingBottom":"0","paddingLeft":"0","paddingSyncUnits":true,"isDynamic":true} --> <!-- wp:generateblocks/button-container {"uniqueId":"621d2c31","isDynamic":true} --> <!-- wp:generateblocks/button {"uniqueId":"e378fc0b","hasUrl":true,"backgroundColor":"#000000","textColor":"#ffffff","backgroundColorHover":"#222222","textColorHover":"#ffffff","showAdvancedTypography":true,"fontSize":13,"marginTop":"5","marginRight":"5","marginBottom":"5","marginLeft":"5","paddingTop":"10","paddingRight":"10","paddingBottom":"10","paddingLeft":"10","borderRadiusTopRight":"20","borderRadiusBottomRight":"20","borderRadiusBottomLeft":"20","borderRadiusTopLeft":"20","className":"dynamic-term-class","gpDynamicTextType":"terms","gpDynamicLinkType":"term-archives","gpDynamicTextReplace":"Terms","gpDynamicTextTaxonomy":"category"} --> <a class="gb-button gb-button-e378fc0b gb-button-text dynamic-term-class" href="#">Terms</a> <!-- /wp:generateblocks/button --> <!-- /wp:generateblocks/button-container --> <!-- /wp:generateblocks/container -->',
		meta: [
			{ key: '_generate_post_meta_location', value: 'before-post-title' },
			{ key: '_generate_disable_primary_post_meta', value: false },
		],
	},
};

export default templates;
