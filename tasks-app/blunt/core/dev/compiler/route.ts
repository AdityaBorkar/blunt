import type { Server, SocketAddress } from 'bun';
import type { FileMetadata } from '#/blunt/types';

export async function CompileRoute({
	request,
	server,
	files,
}: {
	request: {
		req: Request;
		ip: SocketAddress | null;
		path: string;
		isCrawler: boolean | undefined;
	};
	server: Server;
	files: FileMetadata[];
}) {
	const { routesDir } = globalThis.BLUNTJS;

	const RouteFile = files.find((file) => file.type === 'route');
	if (!RouteFile)
		return new Response('[BLUNTJS] Internal Server Error', { status: 500 });

	const Route = await import(`${routesDir}/${RouteFile.path}`);
	return new Response('[BLUNTJS] Internal Server Error', { status: 500 });
}
