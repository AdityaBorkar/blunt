export default function Page() {
	return 'opengraph';
}

export const metadata = {
	openGraph: {
		audio: [
			{
				url: 'https://example.com/audio.mp3',
			},
		],
		description: 'My custom description',
		images: [
			{
				height: 600,
				url: 'https://example.com/image.png',
				width: 800,
			},
			{
				alt: 'My custom alt',
				height: 1600,
				url: 'https://example.com/image2.png',
				width: 1800,
			},
		],
		locale: 'en-US',
		siteName: 'My custom site name',
		title: 'My custom title',
		type: 'website',
		url: 'https://example.com',
		videos: [
			{
				height: 450,
				url: 'https://example.com/video.mp4',
				width: 800,
			},
		],
	},
};
