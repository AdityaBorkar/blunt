export default function Page() {
	return <p>slow</p>;
}

export async function generateMetadata() {
	await new Promise((resolve) => setTimeout(resolve, 3 * 1000));
	return {
		applicationName: 'test',
		authors: [{ name: 'huozhi' }],
		creator: 'huozhi',
		description: 'slow page description',
		generator: 'next.js',
		keywords: ['next.js', 'react', 'javascript'],
		publisher: 'vercel',
		referrer: 'origin-when-cross-origin',
		robots: 'index, follow',
		title: 'slow page',
	};
}

export const dynamic = 'force-dynamic';
