import { writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import bunPluginTailwind from 'bun-plugin-tailwind';

import { genReactScript } from '@/server/serve/build/page/genReactScript';
import { hashCYRB53 } from '@/server/utils/hashCYRB53';
import type { ProjectConfig } from '@/types';

type BuilderProps = {
	pathname: string;
	filePath: string;
	nest: {
		loading?: FileType;
		layout?: FileType;
		middleware?: FileType;
		error?: FileType;
		notFound?: FileType;
	}[];
	projectConfig: ProjectConfig;
};

export async function PageBuilder({
	pathname,
	nest,
	filePath,
	projectConfig,
}: BuilderProps) {
	const isCSR = true; // TODO: Implement CSR.
	// if (isCSR) {
	// 	// const script = generateScript_CSR(files);
	// 	// RETURN blank .html and then createRoot in it.
	// 	return;
	// }

	const reactConfig = { ...projectConfig.react, id: hashCYRB53(filePath) };
	const { jsx, script } = await genReactScript(
		!isCSR,
		filePath,
		nest,
		reactConfig,
	);

	const scriptPath = join(
		process.cwd(),
		`./.blunt/.temp/path-${reactConfig.id}.tsx`,
	);
	await writeFile(scriptPath, script);

	const result = await Bun.build({
		// banner: '"use client";',
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

	// ! WORKAROUND ---------------------------------------------------
	const styles = bundles.filter((bundle) => bundle.endsWith('.css'));
	const bootstrapScriptContent = ` // ! WORKAROUND
	const styles = [${JSON.stringify(styles.map((style) => style).join('"'))}];
	for (const style of styles) {
		const link = document.createElement('link');
		link.rel = 'stylesheet';
		link.type = 'text/css';
		link.href = style;
		document.head.appendChild(link);
		}`;
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
	// ! --------------------------------------------------------------

	return {
		bootstrapScriptContent,
		identifierPrefix: reactConfig.id,
		jsx,
		scripts,
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
