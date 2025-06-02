export default function page() {
	return 'robots';
}

export const metadata = {
	robots: {
		follow: true,

		googleBot: {
			follow: false,
			index: true,
			'max-image-preview': -1,
			'max-snippet': -1,

			'max-video-preview': 'standard',
			noimageindex: true,
		},
		index: false,
		nocache: true,
	},
};
