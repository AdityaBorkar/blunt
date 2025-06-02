import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET() {
	const c = await cookies();
	c.set('a', 'a');
	const hasCookie = c.has('a');

	return NextResponse.json({ hasCookie }); // expect { hasCookie: true }
}
