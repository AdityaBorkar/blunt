export default function page() {
	return 'apple';
}

export async function generateMetadata() {
	const metadata = {
		appleWebApp: {
			startupImage: [
				'/assets/startup/apple-touch-startup-image-768x1004.png',
				{
					media: '(device-width: 768px) and (device-height: 1024px)',
					url: '/assets/startup/apple-touch-startup-image-1536x2008.png',
				},
			],
			statusBarStyle: 'black-translucent',
			title: 'Apple Web App',
		},
		itunes: {
			appArgument: 'myAppArgument',
			appId: 'myAppStoreID',
		},
	};
	return metadata;
}
