export default function sitemap() {
	return [
		{
			changeFrequency: 'yearly',
			lastModified: new Date(),
			priority: 1,
			url: 'https://acme.com',
		},
	];
}

export const revalidate = 5;
