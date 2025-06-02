import fs from 'node:fs';
import path from 'node:path';

export const dynamic = 'force-dynamic';

export async function GET() {
	// dummy call
	fs.readdirSync(path.join(process.cwd(), 'public/exclude-me'));

	return new Response('foo');
}
