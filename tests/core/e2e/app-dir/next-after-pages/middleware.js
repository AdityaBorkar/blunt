import { cookies } from 'next/headers';
import { after, NextResponse } from 'next/server';

import { cliLog } from './utils/log';

export async function middleware(
	/** @type {import ('next/server').NextRequest} */ request,
) {
	const url = new URL(request.url);
	if (url.pathname.startsWith('/middleware/redirect-source')) {
		const requestId = url.searchParams.get('requestId');
		const cookieStore = await cookies();
		after(async () => {
			cliLog({
				cookies: { testCookie: cookieStore.get('testCookie')?.value },
				requestId,
				source: '[middleware] /middleware/redirect-source',
			});
		});
		return NextResponse.redirect(new URL('/middleware/redirect', request.url));
	}
}

export const config = {
	matcher: '/middleware/:path*',
};
