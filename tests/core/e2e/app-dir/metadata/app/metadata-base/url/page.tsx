export default function page() {
	return 'url';
}

export const metadata = {
	alternates: {
		canonical: 'subpath',
	},
	metadataBase: new URL('https://bar.example/url'),
};
