import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';
import Link from 'next/link';
import { useRouter } from 'next/router';
import ReactDOM from 'react-dom/server';

function RouterComp(props) {
	const router = useRouter();

	if (!router) {
		throw new Error('router is missing!');
	}

	return (
		<>
			<p>props {JSON.stringify(props)}</p>
			<p>router: {JSON.stringify(router)}</p>
		</>
	);
}

export async function getServerSideProps({ req, query, preview }) {
	// this ensures the same router context is used by the useRouter hook
	// no matter where it is imported
	console.log(
		ReactDOM.renderToString(
			<RouterContext.Provider
				value={{
					asPath: req.url,
					isPreview: preview,
					pathname: '/',
					query,
				}}
			>
				<p>hello world</p>
				<RouterComp hello={'world'} />
			</RouterContext.Provider>,
		),
	);
	return {
		props: {
			time: Date.now(),
			url: req.url,
			world: 'world',
		},
	};
}

const Page = ({ world, time, url }) => {
	if (typeof window === 'undefined') {
		if (url.startsWith('/_next/data/')) {
			throw new Error('invalid render for data request');
		}
	}

	return (
		<>
			<p>hello {world}</p>
			<span>time: {time}</span>
			<Link href="/non-json" id="non-json">
				to non-json
			</Link>
			<br />
			<Link href="/another" id="another">
				to another
			</Link>
			<br />
			<Link href="/something" id="something">
				to something
			</Link>
			<br />
			<Link href="/normal" id="normal">
				to normal
			</Link>
			<br />
			<Link href="/slow" id="slow">
				to slow
			</Link>
			<br />
			<Link as="/blog/post-1" href="/blog/[post]" id="post-1">
				to dynamic
			</Link>
			<Link as="/blog/post-100" href="/blog/[post]" id="broken-post">
				to broken
			</Link>
			<br />
			<Link
				as="/blog/post-1/comment-1"
				href="/blog/[post]/[comment]"
				id="comment-1"
			>
				to another dynamic
			</Link>
			<Link href="/something?another=thing" id="something-query">
				to something?another=thing
			</Link>
			<br />
			<Link href="/redirect-page">to redirect-page</Link>
			<br />
			<Link href="/rewrite-source/foo">to rewrite-source/foo</Link>
		</>
	);
};

export default Page;
