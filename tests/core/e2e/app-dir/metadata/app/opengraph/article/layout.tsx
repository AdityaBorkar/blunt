import type { Metadata } from 'next';

export default function Layout({ children }) {
	return children;
}

export const metadata = {
	openGraph: {
		authors: ['author1', 'author2', 'author3'],
		description: 'My custom description',
		emails: 'author@vercel.com',
		faxNumbers: '1234567890',
		images: new URL('https://example.com/og-image.jpg'),
		phoneNumbers: '1234567890',
		publishedTime: '2023-01-01T00:00:00.000Z',
		title: 'Layout open graph title',
		type: 'article',
	} satisfies Metadata['openGraph'],
};
