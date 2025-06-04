import { writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import bunPluginTailwind from 'bun-plugin-tailwind';
import {
	// renderToPipeableStream,
	renderToReadableStream,
	renderToString,
} from 'react-dom/server';
import {
	prerender as prerenderReact,
	prerenderToNodeStream,
} from 'react-dom/static';

import { generateScript_SSR } from '@/server/serve/build/page/generateScript_SSR';
import type { ProjectConfig } from '@/types';

const AsyncFunction = (async () => {}).constructor;

export async function buildPage({
	url,
	files,
	config,
	controller,
}: {
	url: string;
	files: FileType[];
	config: ProjectConfig;
	controller: AbortController;
}) {
	const { ssr, streaming, spa, timeout, ppr, edge } = config.pages;
	const renderAtBuildTime = false;
	const { strictMode, profiler, compiler } = config.react;
	const id = url.replace(/\//g, '-');

	const isCSR = false; // TODO: Implement CSR.
	if (isCSR) {
		// const script = generateScript_CSR(files);
		// RETURN blank .html and then createRoot in it.
		return;
	}

	const { jsx, script } = await generateScript_SSR(files, { id, strictMode });

	const scriptPath = join(process.cwd(), `./.blunt/.temp/path-${id}.tsx`);
	await writeFile(scriptPath, script);

	const result = await Bun.build({
		banner: '"use client";',
		entrypoints: [scriptPath],
		env: 'BUN_PUBLIC_*',
		minify: false,
		outdir: '.blunt',
		plugins: [bunPluginTailwind],
		sourcemap: 'linked',
		splitting: true,
		target: 'browser',
	});
	const bundles = result.outputs.map((output) =>
		output.path.replace(process.cwd(), ''),
	);
	const scripts = bundles.filter((bundle) => bundle.endsWith('.js'));

	// Report other bundles.
	bundles.forEach((bundle) => {
		if (
			bundle.endsWith('.js') ||
			bundle.endsWith('.js.map') ||
			bundle.endsWith('.css')
		)
			return;
		console.error({ unknown_bundle: bundle });
	});

	const styles = bundles.filter((bundle) => bundle.endsWith('.css')); // ! WORKAROUND
	const bootstrapScriptContent = ` // ! WORKAROUND
		const styles = [${JSON.stringify(styles.map((style) => style).join('"'))}];
		for (const style of styles) {
			const link = document.createElement('link');
			link.rel = 'stylesheet';
			link.type = 'text/css';
			link.href = style;
			document.head.appendChild(link);
		}`;

	const options = {
		bootstrapModules: scripts,
		bootstrapScriptContent, // ! WORKAROUND
		identifierPrefix: id,
		signal: controller.signal,
	};

	if (renderAtBuildTime) {
		const { prelude } = await (edge
			? prerenderReact(jsx, options)
			: prerenderToNodeStream(jsx, options));
		// TODO: Handle (prerender = true & ssr = true)
		// TODO: Continue to process this to SSR step. Break the reactive components into functions and stream+hydrate them later+separately.
		if (!ssr) return prelude;
	}
	const stream = streaming
		? edge
			? renderToReadableStream(jsx, options)
			: renderToReadableStream(jsx, options) // ! `renderToPipeableStream` not working in Bun.
		: renderToString(jsx); // TODO: NEVER RECOMMENDED. ISSUES WARNINGS.
	return stream;
}

// function Head() {
// 	// TODO: Subscribe to Store
// 	const title = 'Blunt';
// 	const tags = [
// 		{ $tag: 'meta', charSet: 'UTF-8' },
// 		{
// 			$tag: 'meta',
// 			name: 'viewport',
// 			content: 'width=device-width, initial-scale=1.0',
// 		},
// 		{ $tag: 'link', rel: 'icon', href: '/favicon.ico' },
// 	];
// 	return (
// 		<head>
// 			{tags.map(({ $tag, ...props }) => (
// 				<$tag key={$tag} {...props} />
// 			))}
// 			<title>{title}</title>
// 			{/* <!-- SCRIPTS --> */}
// 		</head>
// 	);
// }

// const Page = await import(`${router.dir}/${PageFile.path}`);

// // Performance and Logging
// // TODO: When building, save this details to the file.
// console.log('FETCH [Dynamic] [SSR] route', path);
// // Static, Dynamic-Edge, Dynamic-Server
// // Static generated at (build time/ on demand).
// // Cache-Device, Cache-Edge, Cache-Server
// // PPR is enabled by default.
// // If using Edge, you need to mention the cf / vercel / aws / etc environment to make sure you use the compatible functions.
// // If using Server, you need to mention the node / deno / bun to make sure you use the compatible functions.

// // Page Config
// const PAGE_CONFIG = (Page.config || {}) as BluntPageConfig; // TODO: Validate `PageConfig`
// const SSR = isCrawler ? true : (PAGE_CONFIG.ssr ?? GLOBAL_CONFIG.ssr);
// const STREAMING = isCrawler
// 	? false
// 	: (PAGE_CONFIG.streaming ?? GLOBAL_CONFIG.streaming);
// // Set Server Config for the Route:
// server.timeout(req, TIMEOUT);
