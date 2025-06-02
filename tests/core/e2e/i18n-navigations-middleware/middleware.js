import { NextResponse } from 'next/server';

export const config = { matcher: ['/foo'] };
export async function middleware(_req) {
	return NextResponse.next();
}
