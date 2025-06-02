import { Client } from './client';
import { Server } from './server';

export default async function Page() {
	return (
		<>
			<hr />
			<Server />
			<hr />
			<Client />
		</>
	);
}
