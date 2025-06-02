import { NextResponse } from 'next/server';

import { getRequestMeta } from '../../../helpers';

export async function GET(request: Request) {
	const meta = getRequestMeta(request.headers);
	return NextResponse.json(meta);
}
