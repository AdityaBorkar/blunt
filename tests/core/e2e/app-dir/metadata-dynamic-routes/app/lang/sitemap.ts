import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
	return [
		{
			changeFrequency: 'daily',
			lastModified: '2021-01-01',
			priority: 0.5,
			url: 'https://example.com',
		},
		{
			alternates: {
				languages: {
					de: 'https://example.com/de/about',
					es: 'https://example.com/es/about',
				},
			},
			lastModified: '2021-01-01',
			url: 'https://example.com/about',
		},
	];
}
