import { join } from 'node:path';

export function handleInternalRoute(pathname: string) {
	const filePath = join(process.cwd(), pathname);
	const file = Bun.file(filePath);
	const type = file.type;
	return new Response(file, { headers: { 'Content-Type': type } });
}
