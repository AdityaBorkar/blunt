export default function page() {
	return 'twitter player';
}

export const metadata = {
	twitter: {
		card: 'player',
		creator: 'creator',
		creatorId: 'creatorId',
		description: 'Twitter Description',
		images: 'https://twitter.com/image.png',
		players: {
			height: 100,
			playerUrl: 'https://twitter.com/player',
			streamUrl: 'https://twitter.com/stream',
			width: 100,
		},
		siteId: 'siteId',
		title: 'Twitter Title',
	},
};
