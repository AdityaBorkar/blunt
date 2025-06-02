import { Modal } from '../../../../Modal';

export default async function BarPagePostInterceptSlot({
	params,
}: {
	params: Promise<{
		id: string;
	}>;
}) {
	const { id } = await params;
	return <Modal context="Intercepted on Bar Page" title={`Post ${id}`} />;
}
