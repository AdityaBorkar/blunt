import { writeFile } from 'node:fs/promises';
import ErrorBoundary from 'blunt/server-new/dev/utils/ErrorBoundary';
import bunPluginTailwind from 'bun-plugin-tailwind';
import { Suspense } from 'react';
import { renderToReadableStream } from 'react-dom/server';
import { prerender } from 'react-dom/static';

type FileConfig = {
	render: 'dynamic' | 'static';
	strictMode: boolean;
};

type GlobalConfig = {
	strictMode: boolean;
	profiler: boolean;
};

const AsyncFunction = (async () => {}).constructor;

export async function buildPage({
	url,
	files,
	pageConfig,
	globalConfig,
	controller,
}: {
	url: string;
	files: FileType[];
	pageConfig: FileConfig;
	globalConfig: GlobalConfig;
	controller: AbortController;
}) {
	const components = await Promise.all(
		files.map(async (file) => {
			const _file = await import(file.filePath);
			const fn = _file.default;
			const isAsync = fn instanceof AsyncFunction === true;
			return { fn, isAsync, type: file.type };
		}),
	);

	const type = pageConfig.render;
	const strictMode = globalConfig.strictMode;
	const identifierPrefix = url.replace(/\//g, '-');
	const scriptPath = `./.blunt/unbundled/main-${identifierPrefix}.tsx`;

	const ReactTree = buildReactTree(components); // TODO: Implement <Head />
	const ScriptContent = `
	import { hydrateRoot } from 'react-dom/client';
    import { ${strictMode ? 'StrictMode,' : ''} Suspense } from 'react';
    import ErrorBoundary from 'blunt/server/dev/utils/ErrorBoundary';
	${files.map((file, index) => `import C${index} from '${file.filePath}'`).join('\n')}

	const reactNode = ${strictMode ? '<StrictMode>' : ''}${ReactTree.string}${strictMode ? '</StrictMode>' : ''};
	const root = hydrateRoot(document, reactNode, { identifierPrefix: "${identifierPrefix}" });
	`;
	await writeFile(scriptPath, ScriptContent);
	const result = await Bun.build({
		banner: '"use client";', // TODO: ADD MULTIPLE
		entrypoints: [scriptPath],
		env: 'BUN_PUBLIC_*',
		minify: false,
		outdir: '.blunt',
		plugins: [bunPluginTailwind],
		sourcemap: 'linked',
		splitting: true,
		target: 'browser',
	});

	const bundles = result.outputs
		.map((output) => output.path.replace(process.cwd(), ''))
		.filter((bundle) => !bundle.endsWith('.js.map'));
	const scripts = bundles.filter((bundle) => bundle.endsWith('.js'));
	const styles = bundles.filter((bundle) => bundle.endsWith('.css'));
	const bootstrapScriptContent = `
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
		bootstrapScriptContent,
		identifierPrefix,
		signal: controller.signal,
	};
	const stream =
		type === 'static'
			? (await prerender(ReactTree.jsx, options)).prelude
			: await renderToReadableStream(ReactTree.jsx, { ...options });

	return stream;
}

function buildReactTree(
	components: { fn: React.ComponentType; isAsync: boolean; type: string }[],
	index = 0,
): { jsx: React.ReactNode; string: string } {
	const [current, ...rest] = components;
	const { fn: Component, type } = current;
	const { jsx, string } =
		rest.length > 0
			? buildReactTree(rest, index + 1)
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
		// @ts-expect-error TODO: Fix this
		jsx: <Component>{jsx}</Component>,
		string: `<C${index}>${string}</C${index}>`,
	};
}

// function Head() {
// 	// TODO: Subscribe to Store
// 	const title = 'Maanas • Aditya Borkar';
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
