import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
	return {
		host: 'https://example.com',
		rules: [
			{
				allow: ['/'],
				userAgent: 'Googlebot',
			},
			{
				crawlDelay: 2,
				disallow: ['/'],
				userAgent: ['Applebot', 'Bingbot'],
			},
		],
		sitemap: 'https://example.com/sitemap.xml',
	};
}
