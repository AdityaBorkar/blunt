import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import Debug from './debug';

function transform(router) {
	return {
		asPath: router.asPath,
		isReady: router.isReady ? 'true' : 'false',
		pathname: router.pathname,
		query: Object.entries(router.query)
			.map(([key, value]) => [key, value].join('='))
			.join('&'),
	};
}

export default function DebugError({ children }) {
	const router = useRouter();
	const [debug, setDebug] = useState({});

	useEffect(() => {
		setDebug(transform(router));
	}, [router]);

	return (
		<>
			<dl>
				<Debug name="pathname" value={debug.pathname} />
				<Debug name="asPath" value={debug.asPath} />
				<Debug name="query" value={debug.query} />
				<Debug name="isReady" value={debug.isReady} />
			</dl>
			{children}
		</>
	);
}
