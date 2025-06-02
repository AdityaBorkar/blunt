import { unstable_expirePath } from 'next/cache';
import { NextResponse } from 'next/server';

export async function GET(_req) {
	unstable_expirePath('/');
	return NextResponse.json({ now: Date.now(), revalidated: true });
}
