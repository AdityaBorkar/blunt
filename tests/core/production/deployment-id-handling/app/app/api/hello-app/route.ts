import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export function GET(_req) {
	return NextResponse.json({
		deploymentId: process.env.NEXT_DEPLOYMENT_ID,
	});
}
