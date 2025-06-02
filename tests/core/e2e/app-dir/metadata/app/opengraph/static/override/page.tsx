export default function Page() {
	return 'opengraph-static-override';
}

export const metadata = {
	icons: ['https://custom-icon-1.png'],
	openGraph: {
		images: undefined,
		title: 'no-og-image',
	},
	twitter: {
		images: null,
		title: 'no-tw-image',
	},
};
