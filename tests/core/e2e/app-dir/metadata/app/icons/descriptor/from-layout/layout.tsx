export default function layout({ children }) {
	return children;
}

export const metadata = {
	icons: [
		{
			media: '(prefers-color-scheme: light)',
			rel: 'icon',
			url: 'favicon-light.png',
		},
		{
			media: '(prefers-color-scheme: dark)',
			rel: 'icon',
			url: 'favicon-dark.png',
		},
	],
};
