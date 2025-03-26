import type { Server, SocketAddress } from 'bun';
import type {
	BluntGlobalConfig,
	BluntPageConfig,
	FileMetadata,
} from '#/blunt/types';

import { file } from 'bun';
import TailwindPlugin from 'bun-plugin-tailwind';
import { renderToReadableStream } from 'react-dom/server';

import { jsx } from '#/blunt/core/dev/constants/jsx';

export async function CompilePage({
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
	const { isCrawler, req, path } = request;
	const { GLOBAL_CONFIG, routesDir, tempDir } = globalThis.BLUNTJS;

	const PageFile = files.find((file) => file.type === 'page');
	if (!PageFile)
		return new Response('[BLUNTJS] Internal Server Error', { status: 500 });
	const Page = await import(`${routesDir}/${PageFile.path}`);

	// Performance and Logging
	console.log('⬅️ Fetching route', path);
	console.log('⌛ Compiling');
	const start = performance.now();

	// Page Config
	const PAGE_CONFIG = (Page.config || {}) as BluntPageConfig; // TODO: Validate `PageConfig`
	const SSR = isCrawler ? true : (PAGE_CONFIG.ssr ?? GLOBAL_CONFIG.ssr);
	const STREAMING = isCrawler
		? false
		: (PAGE_CONFIG.streaming ?? GLOBAL_CONFIG.streaming);
	const TIMEOUT = PAGE_CONFIG.timeout ?? GLOBAL_CONFIG.timeout ?? 60;

	// TODO: Execute files sequentially and share outputs. AstroJS + NextJS
	// TODO: Server console.log() support
	// TODO: replace `ssr-head` `ssr-assets`

	// // Scan for all HTML files in the project
	// const entrypoints = [...new Bun.Glob("**.html").scanSync("src")]
	//   .map(a => path.resolve("src", a))
	//   .filter(dir => !dir.includes("node_modules"));
	// console.log(`📄 Found ${entrypoints.length} HTML ${entrypoints.length === 1 ? "file" : "files"} to process\n`);

	server.timeout(req, TIMEOUT);
	const result = await Bun.build({
		// entrypoints: ['../../src/pages/layout.tsx'],
		entrypoints: ['blunt/core/dev/constants/index.html'],
		outdir: tempDir,
		minify: false,
		splitting: false,
		sourcemap: 'linked',
		// banner: "use client"
		// define: {}
		//   define: {
		//     "process.env.NODE_ENV": JSON.stringify("production"),
		//   },
		// env
		// minify: true,
		// splitting: true,
		// bytecode: true,
		target: 'browser',
		publicPath: '/_public/',
		plugins: [TailwindPlugin],
	});
	// console.log(result.outputs);

	// Performance and Logging
	const end = performance.now();
	const compileTime = (end - start).toFixed(2);
	console.log(`✅ Compiled in ${compileTime}ms\n`);

	// HTML Template:
	let output_html = await file(`${tempDir}/index.html`).text();

	// Framework Settings:
	output_html = output_html.replace(
		'<!--framework-settings-->',
		'<script>window.SSR = true;</script>',
	);

	// SSR:
	if (!SSR) {
		console.log('IMPLEMENT: SSR is disabled');
	}

	// Streaming:
	const stream = await renderToReadableStream(jsx, {
		// TODO: Use all options
		// signal: controller.signal,
		// bootstrapModules
		// bootstrapScripts
		// bootstrapScriptContent
		// nonce
		onError(error, errorInfo) {
			console.error('Error in React rendering:', error, errorInfo);
		},
	});
	if (!STREAMING) {
		await stream.allReady;
		const reader = stream.getReader();
		const { value } = await reader.read();
		let html_react = '';
		if (value) html_react += new TextDecoder().decode(value);
		output_html = output_html.replace('<!--ssr-outlet-->', html_react);
	}

	// Return Response
	return new Response(output_html, {
		status: 200,
		headers: { 'Content-Type': 'text/html' },
	});
}
