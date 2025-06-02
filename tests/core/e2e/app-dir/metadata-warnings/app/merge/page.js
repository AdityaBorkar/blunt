export default function Page() {
	return 'merge';
}

export async function generateMetadata(_props, parentResolvingMetadata) {
	const parentMetadata = await parentResolvingMetadata;

	return {
		...parentMetadata,
	};
}
