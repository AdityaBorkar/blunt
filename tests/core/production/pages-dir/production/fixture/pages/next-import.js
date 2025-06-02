import Link from 'next/link';

// prevent static generation for build trace test
export function getServerSideProps() {
	return {
		props: {},
	};
}

export default function Page() {
	return (
		<div>
			<Link href="/about">About Page</Link>
			<p className="index-page">Hello World</p>
		</div>
	);
}
