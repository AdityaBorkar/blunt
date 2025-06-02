import B from 'node:buffer';
import B2 from 'node:buffer';
import { NextResponse } from 'next/server';

export const runtime = 'edge';

/**
 * @param {Request} req
 */
export default async function (req) {
	const text = await req.text();
	const buf = B.Buffer.from(text);
	return NextResponse.json({
		'B2.Buffer === B.Buffer': B.Buffer === B2.Buffer,
		'Buffer === B.Buffer': B.Buffer === Buffer,
		encoded: buf.toString('base64'),
		exposedKeys: Object.keys(B),
		'typeof B.Buffer': typeof B.Buffer,
		'typeof B2.Buffer': typeof B2.Buffer,
		'typeof Buffer': typeof Buffer,
	});
}
