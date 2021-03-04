import {
	_x,
} from '@wordpress/i18n';

const templates = {
	template_1: {
		label: _x( 'Basic single post page hero', 'label', 'gp-premium' ),
		thumbnail: 'page-hero-basic.jpg',
		content: '<!-- wp:generateblocks/container {"uniqueId":"8b6d1c4b","paddingTop":"150","paddingBottom":"150","backgroundColor":"#000000","textColor":"#ffffff","linkColor":"#ffffff","bgImage":{"id":"","image":{"url":"#dynamic-background-image"}},"bgOptions":{"selector":"pseudo-element","opacity":0.3,"overlay":false,"position":"center center","size":"cover","repeat":"no-repeat","attachment":""},"alignment":"center","isDynamic":true,"gpDynamicImageBg":"featured-image"} --> <!-- wp:generateblocks/headline {"uniqueId":"62a8b2cc","element":"h1","showAdvancedTypography":true,"fontSize":50,"gpDynamicTextType":"title","gpDynamicTextReplace":"Page Title"} --> <h1 class="gb-headline gb-headline-62a8b2cc gb-headline-text">Page Title</h1> <!-- /wp:generateblocks/headline --> <!-- wp:generateblocks/container {"uniqueId":"f49b9f49","paddingTop":"0","paddingRight":"0","paddingBottom":"0","paddingLeft":"0","paddingSyncUnits":true,"isDynamic":true,"gpInlinePostMeta":true,"gpInlinePostMetaJustify":"center"} --> <!-- wp:generatepress/dynamic-image {"imageType":"author-avatar","avatarRounded":true} /--> <!-- wp:generateblocks/headline {"uniqueId":"2e715b13","element":"p","marginBottom":"0","marginLeft":"10","gpDynamicTextType":"post-author","gpDynamicTextReplace":"Author name"} --> <p class="gb-headline gb-headline-2e715b13 gb-headline-text">Author name</p> <!-- /wp:generateblocks/headline --> <!-- wp:generateblocks/headline {"uniqueId":"dedbe2c8","element":"p","marginBottom":"0","marginLeft":"20","paddingLeft":"20","borderSizeLeft":"1","gpDynamicTextType":"post-date","gpDynamicTextReplace":"Post date","gpDynamicDateUpdated":true} --> <p class="gb-headline gb-headline-dedbe2c8 gb-headline-text">Post date</p> <!-- /wp:generateblocks/headline --> <!-- /wp:generateblocks/container --> <!-- /wp:generateblocks/container -->',
		meta: [
			{ key: '_generate_hook', value: 'generate_after_header' },
			{ key: '_generate_disable_title', value: true },
			{ key: '_generate_disable_featured_image', value: true },
			{ key: '_generate_disable_primary_post_meta', value: true },
		],
	},
	template_2: {
		label: _x( 'Single post hero with excerpt', 'label', 'gp-premium' ),
		thumbnail: 'page-hero-excerpt.jpg',
		content: '<!-- wp:generateblocks/container {"uniqueId":"70385d72","paddingTop":"80","paddingRight":"40","paddingBottom":"80","paddingLeft":"40","isDynamic":true} --> <!-- wp:generateblocks/grid {"uniqueId":"5dc55b95","columns":2,"horizontalGap":80,"verticalGap":20,"isDynamic":true} --> <!-- wp:generateblocks/container {"uniqueId":"579e5b87","isGrid":true,"gridId":"fde86e48","width":45,"widthTablet":60,"paddingTop":"0","paddingRight":"0","paddingBottom":"0","paddingLeft":"0","verticalAlignment":"center","showAdvancedTypography":true,"fontSize":14,"isDynamic":true} --> <!-- wp:generateblocks/container {"uniqueId":"d909e043","paddingTop":"0","paddingRight":"0","paddingBottom":"0","paddingLeft":"0","paddingSyncUnits":true,"marginBottom":"10","isDynamic":true,"gpInlinePostMeta":true} --> <!-- wp:generateblocks/headline {"uniqueId":"9fdb86dc","element":"p","textColor":"#000000","linkColor":"#000000","showAdvancedTypography":true,"fontWeight":"900","fontSize":14,"textTransform":"uppercase","marginRight":"10","marginBottom":"0","paddingRight":"10","borderSizeRight":"1","className":"dynamic-term-class","gpDynamicTextType":"terms","gpDynamicLinkType":"term-archives","gpDynamicTextReplace":"Category","gpDynamicTextTaxonomy":"category"} --> <p class="gb-headline gb-headline-9fdb86dc gb-headline-text dynamic-term-class">Category</p> <!-- /wp:generateblocks/headline --> <!-- wp:generateblocks/headline {"uniqueId":"1ee4cbcf","element":"p","showAdvancedTypography":true,"fontSize":14,"marginRight":"10","marginBottom":"0","gpDynamicTextType":"post-date","gpDynamicTextReplace":"Date","gpDynamicDateUpdated":true} --> <p class="gb-headline gb-headline-1ee4cbcf gb-headline-text">Date</p> <!-- /wp:generateblocks/headline --> <!-- /wp:generateblocks/container --> <!-- wp:generateblocks/headline {"uniqueId":"56c7eb13","marginBottom":"10","gpDynamicTextType":"title","gpDynamicTextReplace":"Title"} --> <h2 class="gb-headline gb-headline-56c7eb13 gb-headline-text">Title</h2> <!-- /wp:generateblocks/headline --> <!-- wp:generatepress/dynamic-content {"contentType":"post-excerpt","useThemeMoreLink":false} /--> <!-- /wp:generateblocks/container --> <!-- wp:generateblocks/container {"uniqueId":"4e92c4e8","isGrid":true,"gridId":"fde86e48","width":55,"widthTablet":40,"minHeight":400,"minHeightMobile":250,"paddingTop":"0","paddingRight":"0","paddingBottom":"0","paddingLeft":"0","bgImage":{"id":"","image":{"url":"#dynamic-background-image"}},"bgOptions":{"selector":"element","opacity":1,"overlay":false,"position":"center center","size":"cover","repeat":"no-repeat","attachment":""},"isDynamic":true,"gpDynamicImageBg":"featured-image","gpUseFallbackImageBg":true} /--> <!-- /wp:generateblocks/grid --> <!-- /wp:generateblocks/container -->',
		meta: [
			{ key: '_generate_hook', value: 'generate_after_header' },
			{ key: '_generate_disable_title', value: true },
			{ key: '_generate_disable_featured_image', value: true },
			{ key: '_generate_disable_primary_post_meta', value: true },
		],
	},
};

export default templates;
