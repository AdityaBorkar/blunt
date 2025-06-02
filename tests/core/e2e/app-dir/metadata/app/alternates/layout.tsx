export default function layout({ children }) {
	return children;
}

export const metadata = {
	alternates: {
		canonical: './',
		languages: {
			'de-DE': './de-DE',
			'en-US': './en-US',
		},
	},
	metadataBase: 'https://example.com',
};
