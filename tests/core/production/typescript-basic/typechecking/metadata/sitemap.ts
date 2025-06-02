import type { MetadataRoute } from 'next';
// eslint-disable-next-line @typescript-eslint/no-unused-expressions
() => {
	({
		alternates: undefined,
		changeFrequency: undefined,
		images: undefined,
		lastModified: undefined,
		priority: undefined,
		url: '',
		videos: undefined,
	}) satisfies MetadataRoute.Sitemap[number];
	({
		alternates: {
			languages: undefined,
		},
		url: '',
		videos: [
			{
				content_loc: undefined,
				description: '',
				duration: undefined,
				expiration_date: undefined,
				family_friendly: undefined,
				live: undefined,
				platform: undefined,
				player_loc: undefined,
				publication_date: undefined,
				rating: undefined,
				requires_subscription: undefined,
				restriction: undefined,
				tag: undefined,
				thumbnail_loc: '',
				title: '',
				uploader: undefined,
				view_count: undefined,
			},
		],
	}) satisfies MetadataRoute.Sitemap[number];
	({
		alternates: {
			languages: {
				en: undefined,
			},
		},
		url: '',
		videos: [
			{
				description: '',
				thumbnail_loc: '',
				title: '',
				uploader: {
					content: undefined,
					info: undefined,
				},
			},
		],
	}) satisfies MetadataRoute.Sitemap[number];
};
