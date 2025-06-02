import { withRouter } from 'next/router';

const Page = ({ router: { query } }) => (
	<>
		<p id={`q${query.id}`}>{query.id}</p>
		<a href="/query?id=1" id="first">
			Go to ?id=1
		</a>
		<a href="/query?id=2" id="second">
			Go to ?id=2
		</a>
	</>
);

Page.getInitialProps = () => ({});

export default withRouter(Page);
