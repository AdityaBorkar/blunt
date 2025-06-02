export default function Page() {
	return <div>static page</div>;
}

export async function generateMetadata() {
	return {
		description: 'static page description',
		title: 'static page',
	};
}
