import { unstable_expireTag } from 'next/cache';
import { NextResponse } from 'next/server';

export async function GET(_req) {
	unstable_expireTag('thankyounext');
	return NextResponse.json({ now: Date.now(), revalidated: true });
}
