import 'server-only';

import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
	return [
		{
			changeFrequency: 'weekly',
			lastModified: '2021-01-01',
			priority: 0.5,
			url: 'https://example.com',
		},
		{
			lastModified: '2021-01-01',
			url: 'https://example.com/about',
		},
	];
}

export const dynamic = 'force-dynamic';
