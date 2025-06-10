import { join } from 'node:path';
import { Suspense } from 'react';

import ErrorBoundary from '@/server/utils/ErrorBoundary';

const PRECEDENCE = ['error', 'loading', 'template', 'layout']; //  'not-found'

export async function genReactScript(
	ssr: boolean,
	pagePath: string,
	nest: FileType[],
	{ strictMode, id }: { strictMode: boolean; id: string },
) {
	// ? Performance Compare
	// const files = [];
	// for (const file of nest) {
	// 	for (const type in PRECEDENCE) {
	// 		if (type in file) {
	// 			const path = file[type as keyof typeof file];
	// 			files.push({ path, type });
	// 		}
	// 	}
	// }
	const files = nest.flatMap((files) =>
		Object.entries(files)
			.filter(([key]) => PRECEDENCE.includes(key))
			.sort(([a], [b]) => PRECEDENCE.indexOf(a) - PRECEDENCE.indexOf(b))
			.map(([type, path]) => ({ path, type })),
	);
	files.push({ path: pagePath, type: 'page' });
	const { jsx, string } = await buildReactTree(files);

	const script = `
	${
		ssr
			? "import { hydrateRoot } from 'react-dom/client';"
			: "import { createRoot } from 'react-dom/client';"
	}

    import { ${strictMode ? 'StrictMode,' : ''} Suspense } from 'react';
	import ErrorBoundary from '.blunt/.temp/ErrorBoundary';
	${files.map((file, index) => `import C${index} from '${file.path}'`).join('\n')}

	const reactNode = ${strictMode ? '<StrictMode>' : ''}${string}${strictMode ? '</StrictMode>' : ''};
	${
		ssr
			? `const root = hydrateRoot(document, reactNode, { identifierPrefix: '${id}' });`
			: `const root = createRoot(document.querySelector('#root'), { identifierPrefix: '${id}' });
			root.render(reactNode);`
	}
	`;

	return { jsx, script };
}

async function buildReactTree(
	files: {
		type: 'loading' | 'error' | 'template' | 'layout' | 'not-found' | 'page';
		path: string;
	}[],
	index = 0,
): Promise<{ jsx: React.ReactNode; string: string }> {
	const [file, ...rest] = files;
	if (!file) return { jsx: null, string: '' };
	const { jsx, string } = await buildReactTree(rest, index + 1);

	const fullPath = join(process.cwd(), file.path);
	const { default: Component } = await import(fullPath);
	// const isAsync = Component instanceof AsyncFunction === true;

	if (file.type === 'loading')
		return {
			jsx: <Suspense fallback={<Component />}>{jsx}</Suspense>,
			string: `<Suspense fallback={<C${index} />}>${string}</Suspense>`,
		};
	if (file.type === 'error')
		return {
			jsx: <ErrorBoundary fallback={<Component />}>{jsx}</ErrorBoundary>,
			string: `<ErrorBoundary fallback={<C${index} />}>${string}</ErrorBoundary>`,
		};
	// TODO: RELOAD ON `template`
	// TODO: not-found is a page
	return {
		jsx: <Component>{jsx}</Component>,
		string: `<C${index}>${string}</C${index}>`,
	};
}
