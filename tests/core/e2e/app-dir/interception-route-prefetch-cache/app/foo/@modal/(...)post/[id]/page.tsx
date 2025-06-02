import { Modal } from '../../../../Modal';

export default async function FooPagePostInterceptSlot({
	params,
}: {
	params: Promise<{
		id: string;
	}>;
}) {
	const { id } = await params;
	return <Modal context="Intercepted on Foo Page" title={`Post ${id}`} />;
}
