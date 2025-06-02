export default function sitemap() {
	return [
		{
			changeFrequency: 'secondly',
			lastModified: new Date(),
			priority: 1,
			url: 'https://acme.com',
		},
		{
			changeFrequency: 'secondly',
			lastModified: new Date(),
			priority: 0.8,
			url: 'https://acme.com/about',
		},
	];
}

export const dynamic = 'force-dynamic';

export async function generateSitemaps() {
	return [{ id: 0 }, { id: 1 }];
}
