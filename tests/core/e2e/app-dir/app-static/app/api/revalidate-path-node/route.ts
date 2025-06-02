import { unstable_expirePath } from 'next/cache';
import { type NextRequest, NextResponse } from 'next/server';

export const revalidate = 1;

export async function GET(req: NextRequest) {
	const path = req.nextUrl.searchParams.get('path') || '/';
	try {
		console.log('revalidating path', path);
		unstable_expirePath(path);
		return NextResponse.json({ now: Date.now(), revalidated: true });
	} catch (err) {
		console.error('Failed to revalidate', path, err);
		return NextResponse.json({ now: Date.now(), revalidated: false });
	}
}
