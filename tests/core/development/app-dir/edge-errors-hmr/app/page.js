import { CompClient } from './comp.client';
import { CompServer } from './comp.server';

export const runtime = 'edge';

export default function Home() {
	return (
		<div>
			<CompServer />
			<CompClient />
		</div>
	);
}
