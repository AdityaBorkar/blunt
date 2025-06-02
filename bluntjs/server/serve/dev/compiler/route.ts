import type { Server, SocketAddress } from 'bun';

import type { FileMetadata } from '../../../../types/types';

export async function CompileRoute({
	// request,
	// server,
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
	const { router } = globalThis.BLUNTJS;

	const RouteFile = files.find((file) => file.type === 'route');
	if (!RouteFile)
		return new Response('[BLUNTJS] Internal Server Error', { status: 500 });

	const _Route = await import(`${router.dir}/${RouteFile.path}`);
	return new Response('[BLUNTJS] Internal Server Error', { status: 500 });
}
