import { load } from 'transitive';

export default async function Page() {
	const value = await load('a');
	return <d1iv>{value}</d1iv>;
}
