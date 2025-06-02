export default function page() {
	return 'facebook';
}

export async function generateMetadata() {
	const metadata = {
		facebook: {
			admins: ['120', '122', '124'],
			appId: '12345678',
		},
		pinterest: {
			richPin: true,
		},
	};
	return metadata;
}
