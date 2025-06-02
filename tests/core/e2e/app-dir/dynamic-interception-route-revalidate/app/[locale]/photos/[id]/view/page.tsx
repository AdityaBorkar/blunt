import Modal from '../../../modal';

export default async function PhotoPage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	return (
		<div className="container mx-auto my-10">
			<div className="mx-auto w-1/2 border border-gray-700">
				<h1 id="full-page">Full Page</h1>
				<Modal photoId={(await params).id} />
			</div>
		</div>
	);
}
