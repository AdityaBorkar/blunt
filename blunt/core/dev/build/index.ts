import { readdir } from 'node:fs/promises';
import { join } from 'node:path';
import { file } from 'bun';
import TailwindPlugin from 'bun-plugin-tailwind';

const RESERVED_FILE_NAMES = [
	'layout.tsx',
	'page.tsx',
	'loading.tsx',
	'error.tsx',
	'not-found.tsx',
	'middleware.ts',
	'route.ts',
];

export async function BuildWorkspace() {
	const { router, outputDir } = globalThis.BLUNTJS;
	console.log('BUILDING WORKSPACE: ', outputDir);

	// Read all files and construct a tree of files
	interface RouteType {
		get: () => void;
		'#': {
			page: string;
			route: string;
			template: string;
			layout: string;
			loading: string;
			middleware: string;
			error: string;
			notFound: string;
			forbidden: string;
			unauthorized: string;
		};
		[key: string]: RouteType;
	}
	const routes: { [key: string]: RouteType } = {
		// Priority of execution = middleware -> template -> layout -> loading -> route / page -> notFound / error / forbidden / unauthorized
		// dashboard: {
		// 	get() {
		// 		// get("route")
		// 		// getAll("layout")
		// 		// nearest("notFound")
		// 	},
		// 	'#': {
		// 		page: '',
		// 		route: '',
		// 		template: '',
		// 		layout: '',
		// 		loading: '',
		// 		middleware: '',
		// 		error: '',
		// 		notFound: '',
		// 		forbidden: '',
		// 		unauthorized: '',
		// 	},
		// 	'route-1': {
		// 		get() {},
		// 	},
		// },
	};
	scanDirectory(router.dir, []);

	async function scanDirectory(dir: string, triePath: string[]) {
		const files = await readdir(dir);
		for (const fileName of files) {
			const isFile = await file(join(dir, fileName)).exists();
			if (!isFile) {
				// ignored? pattern?
				eval(
					`routes${triePath.length > 0 ? `["${triePath.join('"].["')}"]` : ''}["${fileName}"] = {}`,
				);
				scanDirectory(join(dir, fileName), [...triePath, fileName]);
				continue;
			}

			const isReserved = RESERVED_FILE_NAMES.includes(fileName);
			if (!isReserved) {
				// TODO: Hash file name and save as it for future imports and references
				// TODO: If possible link it directly to the path and not copy the file name.
				continue;
			}

			const route = triePath.join('.');
			// const trieExists = eval(`routes.${route} `);
			const exists = route in routes;
			console.log({ fileName, triePath, exists, routes });

			// TODO: BUILD AHEAD OF TIME
			// TODO: Detect ssr, rendering mode, and tell that in the fetch
			// TODO: Auto-add "use client" directive.
			// Every file has it's own distinct "index.html" file
		}
	}

	// Build
	// const result = await Bun.build({
	// 	entrypoints: ['blunt/core/dev/constants/index.html'], // !
	// 	outdir: outputDir,
	// 	minify: false,
	// 	splitting: false,
	// 	sourcemap: 'linked',
	// 	// banner: "use client"
	// 	// define: {}
	// 	//   define: {
	// 	//     "process.env.NODE_ENV": JSON.stringify("production"),
	// 	//   },
	// 	// env
	// 	// minify: true,
	// 	// splitting: true,
	// 	// bytecode: true,
	// 	target: 'browser',
	// 	publicPath: '/_public/',
	// 	plugins: [TailwindPlugin],
	// });
	// console.log(result.outputs);
}
