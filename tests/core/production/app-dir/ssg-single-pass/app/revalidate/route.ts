import { unstable_expirePath } from 'next/cache';
import { NextResponse } from 'next/server';

export async function GET() {
	unstable_expirePath('/');

	return NextResponse.json({ success: true });
}
