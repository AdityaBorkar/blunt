import { after } from 'next/server';

import { cliLog } from '../../../utils/log';

export async function getStaticProps() {
	after(() => {
		cliLog({
			source: '[pages-dir] /pages-dir/invalid-in-gsp',
		});
	});
	return { props: {} };
}

// prevent this from erroring during build in `next start` mode.
export function getStaticPaths() {
	return {
		fallback: 'blocking',
		paths: [],
	};
}

export default function Page() {
	return <div>Invalid in getStaticProps</div>;
}
