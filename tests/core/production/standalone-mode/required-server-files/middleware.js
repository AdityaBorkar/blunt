import { ImageResponse } from 'next/og';
import { NextResponse } from 'next/server';

export async function middleware(req) {
	console.log('middleware', req.url);
	if (req.nextUrl.pathname === '/a-non-existent-page/to-test-with-middleware') {
		return new ImageResponse(<div>Hello world</div>, {
			height: 600,
			width: 1200,
		});
	}
	return NextResponse.next();
}
