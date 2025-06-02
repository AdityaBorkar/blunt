import { cookies, headers } from 'next/headers.js';
import { use } from 'react';

import { ClientHooks } from './client-hooks-ext';

export function useHooks() {
	headers();
	use(cookies());
	return <ClientHooks />;
}
