import Link from 'next/link';

async function Page() {
	return (
		<div id="intercepting-page">
			Showcase Intercepting Page
			<Link href="/templates/single">Single</Link>
		</div>
	);
}

export default Page;
