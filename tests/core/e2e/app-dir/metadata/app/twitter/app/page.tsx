export default function page() {
	return 'twitter app';
}

export const metadata = {
	twitter: {
		app: {
			id: {
				googleplay: 'twitter_app://googleplay',
				ipad: 'twitter_app://ipad',
				iphone: 'twitter_app://iphone',
			},
			name: 'twitter_app',
			url: {
				ipad: 'https://ipad_url',
				iphone: 'https://iphone_url',
			},
		},
		card: 'app',
		creator: 'creator',
		creatorId: 'creatorId',
		description: 'Twitter Description',
		images: [
			'https://twitter.com/image-100x100.png',
			'https://twitter.com/image-200x200.png',
		],
		siteId: 'siteId',
		title: 'Twitter Title',
	},
};
