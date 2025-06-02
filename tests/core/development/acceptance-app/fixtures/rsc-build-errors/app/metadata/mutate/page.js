export default function page(_props) {
	return <p>mutate</p>;
}

export async function generateMetadata(_props, parent) {
	const parentMetadata = await parent;

	return {
		...parentMetadata,
	};
}
