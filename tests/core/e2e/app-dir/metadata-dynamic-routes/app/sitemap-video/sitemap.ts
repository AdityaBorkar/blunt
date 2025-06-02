import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
	return [
		{
			url: 'https://example.com/about',
			videos: [
				{
					content_loc: 'http://streamserver.example.com/video123.mp4',
					description: 'this is the description',
					duration: 2,
					expiration_date: '2025-09-16',
					family_friendly: 'yes',
					live: 'no',
					platform: {
						content: 'web',
						relationship: 'allow',
					},
					player_loc: 'https://www.example.com/videoplayer.php?video=123',
					publication_date: '2024-09-16',
					rating: 4,
					requires_subscription: 'no',
					restriction: {
						content: 'IE GB US CA',
						relationship: 'allow',
					},
					tag: 'summer',
					thumbnail_loc: 'https://example.com/image.jpg',
					title: 'example',
					uploader: {
						content: 'GrillyMcGrillerson',
						info: 'https://www.example.com/users/grillymcgrillerson',
					},
					view_count: 50,
				},
			],
		},
	];
}
