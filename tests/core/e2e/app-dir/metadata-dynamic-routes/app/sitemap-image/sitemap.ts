import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
	return [
		{
			changeFrequency: 'daily',
			lastModified: '2024-01-01',
			priority: 0.5,
			url: 'https://example.com',
		},
		{
			images: [
				'https://example.com/image1.jpg',
				'https://example.com/image2.jpg',
			],
			lastModified: '2024-01-01',
			url: 'https://example.com/about',
		},
	];
}
