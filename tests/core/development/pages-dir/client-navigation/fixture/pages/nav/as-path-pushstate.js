import Link from 'next/link';
import { withRouter } from 'next/router';

export default withRouter(({ router: { asPath, query } }) => {
	return (
		<div id={asPath.replace('/', '').replace('/', '-')}>
			<div id="router-query">{JSON.stringify(query)}</div>
			<div>
				<Link
					as="/something/hello"
					href="/nav/as-path-pushstate?something=hello"
					id="hello"
				>
					hello
				</Link>
			</div>
			<div>
				<Link as="/something/else" href="/nav/as-path-pushstate" id="else">
					else
				</Link>
			</div>
			<div>
				<Link
					as="/nav/as-path-pushstate"
					href="/nav/as-path-pushstate"
					id="hello2"
				>
					normal hello
				</Link>
			</div>
			{query.something === 'hello' && (
				<Link
					as="/something/same-query"
					href="/nav/as-path-pushstate?something=hello"
					id="same-query"
				>
					same query
				</Link>
			)}
		</div>
	);
});
