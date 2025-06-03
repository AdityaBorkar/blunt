import { writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import bunPluginTailwind from 'bun-plugin-tailwind';
import { Suspense } from 'react';
import {
	renderToPipeableStream,
	renderToReadableStream,
	renderToString,
} from 'react-dom/server';
import {
	prerender as prerenderReact,
	prerenderToNodeStream,
} from 'react-dom/static';

import type { ProjectConfig } from '@/types';
import ErrorBoundary from '../../utils/ErrorBoundary';

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
	const components = await Promise.all(
		files.map(async (file) => {
			const fullPath = join(process.cwd(), file.filePath);
			const _file = await import(fullPath);
			const fn = _file.default;
			const isAsync = fn instanceof AsyncFunction === true;
			return { fn, isAsync, type: file.type };
		}),
	);

	const { ssr, streaming, spa, timeout, ppr } = config.pages;
	const renderAtBuildTime = false;
	const edge = true;
	const { strictMode } = config.react;

	const renderMode = 'static'; // config.pages.ssr ? 'dynamic' : 'static';
	const scriptPath = join(process.cwd(), `./.blunt/unbundled/main-${id}.tsx`);

	const ReactTree = await buildReactTree(components).catch((error) => {
		console.log('COULD NOT BUILD REACT TREE');
		return { jsx: null, string: '' };
	}); // TODO: Implement <Head />
	const ScriptContent = `
	import { hydrateRoot } from 'react-dom/client';
    import { ${strictMode ? 'StrictMode,' : ''} Suspense } from 'react';
	import ErrorBoundary from '.blunt/unbundled/ErrorBoundary';
	${files.map((file, index) => `import C${index} from '${file.filePath}'`).join('\n')}

	const reactNode = ${strictMode ? '<StrictMode>' : ''}${ReactTree.string}${strictMode ? '</StrictMode>' : ''};
	const root = hydrateRoot(document, reactNode, { identifierPrefix: "${id}" });
	`;
	await writeFile(scriptPath, ScriptContent);
	const result = await Bun.build({
		banner: '"use client";',
		entrypoints: [scriptPath], // TODO: ADD MULTIPLE
		env: 'BUN_PUBLIC_*',
		minify: false,
		outdir: '.blunt',
		plugins: [bunPluginTailwind],
		sourcemap: 'linked',
		splitting: true,
		target: 'browser',
	});

	if (!renderAtBuildTime && !ssr) {
		// RETURN blank .html and then hydrate it.
	}

	const id = url.replace(/\//g, '-');

	const bundles = result.outputs
		.map((output) => output.path.replace(process.cwd(), ''))
		.filter((bundle) => !bundle.endsWith('.js.map'));
	const scripts = bundles.filter((bundle) => bundle.endsWith('.js'));
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
			? prerenderReact(ReactTree.jsx, options)
			: prerenderToNodeStream(ReactTree.jsx, options));
		// TODO: Continue to process this to SSR step.
		// TODO: Break the reactive components into functions and stream+hydrate them later+separately.
		return prelude;
	}
	if (ssr) {
		const stream = streaming
			? edge
				? renderToReadableStream(ReactTree.jsx, options)
				: renderToPipeableStream(ReactTree.jsx, options)
			: renderToString(ReactTree.jsx); // TODO: NEVER RECOMMENDED. ISSUES WARNINGS.
		return stream;
	}
}

async function buildReactTree(
	components: { fn: React.ComponentType; isAsync: boolean; type: string }[],
	index = 0,
): Promise<{ jsx: React.ReactNode; string: string }> {
	const [current, ...rest] = components;
	// @ts-expect-error TODO: Fix this
	const { fn: Component, type } = current;
	const { jsx, string } =
		rest.length > 0
			? await buildReactTree(rest, index + 1)
			: { jsx: null, string: '' };

	if (type === 'loading')
		return {
			jsx: <Suspense fallback={<Component />}>{jsx}</Suspense>,
			string: `<Suspense fallback={<C${index} />}>${string}</Suspense>`,
		};
	if (type === 'error')
		return {
			jsx: <ErrorBoundary fallback={<Component />}>{jsx}</ErrorBoundary>,
			string: `<ErrorBoundary fallback={<C${index} />}>${string}</ErrorBoundary>`,
		};
	return {
		jsx: <Component>{jsx}</Component>,
		string: `<C${index}>${string}</C${index}>`,
	};
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
