import fs from 'node:fs';
import path from 'node:path';
import { ImageResponse } from 'next/og';
import { NextResponse } from 'next/server';

export const config = {
	runtime: 'nodejs',
};

export async function middleware(req) {
	console.log('middleware', req.url);
	console.log(
		'env',
		await fs.promises.readFile(path.join(process.cwd(), '.env')),
	);

	if (req.nextUrl.pathname === '/a-non-existent-page/to-test-with-middleware') {
		return new ImageResponse(<div>Hello world</div>, {
			height: 600,
			width: 1200,
		});
	}
	return NextResponse.next();
}
