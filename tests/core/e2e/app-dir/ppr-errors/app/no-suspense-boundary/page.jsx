import { cookies } from 'next/headers';

export default async function Page() {
	try {
		await cookies();
	} catch (_err) {}
	return <div>Hello World</div>;
}
