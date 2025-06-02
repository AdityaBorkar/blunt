export default function Page() {
	return 'page';
}

export const metadata = {
	alternates: {
		// relative url with query string
		canonical: '/metadata?query=string',
	},
	openGraph: {
		// external url with different domain
		url: 'http://trailingslash-another.com/metadata',
	},
};
