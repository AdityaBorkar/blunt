import { cookies, headers } from 'next/headers';
import { use } from 'react';

import { ClientHooks } from './client-hooks';

export function useHooks() {
	use(headers());
	use(cookies());
	return <ClientHooks />;
}
