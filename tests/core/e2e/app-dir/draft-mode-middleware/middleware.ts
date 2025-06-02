import { draftMode } from 'next/headers';
import { type NextRequest, NextResponse } from 'next/server';

export async function middleware(_req: NextRequest) {
	const { isEnabled } = await draftMode();
	console.log('draftMode().isEnabled from middleware:', isEnabled);
	return NextResponse.next();
}

export const config = {
	matcher: ['/((?!_next/static|_next/image|img|assets|ui|favicon.ico).*)'],
};
