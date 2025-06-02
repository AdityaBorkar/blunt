import Widget from './components/widget';
import NotAPage from './not-a-page';

export default async function Page(props) {
	const params = await props.params;
	return (
		<>
			<h1 data-params={params.slug.join('/') ?? ''} id="text">
				hello from /catch-all/{params.slug.join('/')}
			</h1>
			<Widget />
			<NotAPage />
		</>
	);
}
