import { headers } from 'next/headers';

import ClientComp from './client-component';

export default async function Page() {
	// Opt-in to SSR.
	await headers();
	return <ClientComp />;
}
