import { type NextRequest, NextResponse } from 'next/server';

export const revalidate = 1;

export function generateStaticParams() {
	console.log('generateStaticParams static/[slug]');
	return [{ slug: 'first' }, { slug: 'second' }];
}

export const GET = async (
	_req: NextRequest,
	props: { params: Promise<{ slug: string }> },
) => {
	const params = await props.params;
	const resolvedParams = await params;
	return NextResponse.json({ now: Date.now(), params: resolvedParams });
};
