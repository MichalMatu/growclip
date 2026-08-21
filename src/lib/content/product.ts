export * from './product-base';

import {
	getProductContent as getBaseProductContent,
	type Locale,
	type ProductContent
} from './product-base';

const assetPrefix = import.meta.env.PROD ? '/growclip' : '';

export const contactHref =
	'mailto:matuszewski.wroclaw@gmail.com?subject=GrowClip%20growbox%20setup';

function withAssetPrefix(src: string): string {
	if (!assetPrefix || !src.startsWith('/')) {
		return src;
	}
	return `${assetPrefix}${src}`;
}

export function getProductContent(locale: Locale): ProductContent {
	const content = getBaseProductContent(locale);
	return {
		...content,
		hero: {
			...content.hero,
			imageSrc: withAssetPrefix(content.hero.imageSrc)
		},
		media: content.media.map((slot) => ({
			...slot,
			src: withAssetPrefix(slot.src)
		}))
	};
}
