import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function Page(props) {
	const router = useRouter();
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	return (
		<>
			<p id="page">dynamic page</p>
			<p id="props">{JSON.stringify(props)}</p>
			<p id="router">
				{JSON.stringify(
					mounted
						? {
								asPath: router.asPath,
								basePath: router.basePath,
								pathname: router.pathname,
								query: router.query,
							}
						: {},
				)}
			</p>

			<Link href="/" id="to-index">
				to /index
			</Link>
			<br />

			<Link href="/dynamic/second" id="to-dynamic">
				to /dynamic/second
			</Link>
			<br />
		</>
	);
}

export function getStaticPaths() {
	return {
		fallback: true,
		paths: ['/dynamic/first'],
	};
}

export function getStaticProps({ params }) {
	return {
		props: {
			hello: 'world',
			now: Date.now(),
			params,
		},
	};
}
