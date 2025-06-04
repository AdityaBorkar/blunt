import { join } from 'path';
import { Suspense } from 'react';

import ErrorBoundary from '@/server/utils/ErrorBoundary';

export async function generateScript_SSR(
	files: FileType[],
	{ strictMode, id }: { strictMode: boolean; id: string },
) {
	const { jsx, string } = await buildReactTree(files);

	const script = `
	import { hydrateRoot } from 'react-dom/client';
    import { ${strictMode ? 'StrictMode,' : ''} Suspense } from 'react';
	import ErrorBoundary from '.blunt/.temp/ErrorBoundary';
	${files.map((file, index) => `import C${index} from '${file.filePath}'`).join('\n')}

	const reactNode = ${strictMode ? '<StrictMode>' : ''}${string}${strictMode ? '</StrictMode>' : ''};
	const root = hydrateRoot(document, reactNode, { identifierPrefix: "${id}" });
	`;

	return { jsx, script };
}

async function buildReactTree(
	files: FileType[],
	index = 0,
): Promise<{ jsx: React.ReactNode; string: string }> {
	const [file, ...rest] = files;
	if (!file) return { jsx: null, string: '' };
	const { jsx, string } = await buildReactTree(rest, index + 1);

	const fullPath = join(process.cwd(), file.filePath);
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
	return {
		jsx: <Component>{jsx}</Component>,
		string: `<C${index}>${string}</C${index}>`,
	};
}
