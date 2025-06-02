import { type NextRequest, NextResponse } from 'next/server';

export const GET = (req: NextRequest) => {
	const url = new URL(req.url);
	return NextResponse.json({
		nextUrl: req.nextUrl.pathname,
		url: url.pathname,
	});
};
