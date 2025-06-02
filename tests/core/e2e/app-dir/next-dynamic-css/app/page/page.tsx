import './global2.css';

import { cookies } from 'next/headers';

import Inner2 from './inner2';

export default async function Page() {
	await cookies();
	return (
		<>
			<p id="global">Hello Global</p>
			<Inner2 />
		</>
	);
}
