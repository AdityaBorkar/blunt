// import { readdir } from 'node:fs/promises';
// import { join } from 'node:path';
// import { file } from 'bun';

// import { processDir } from './processDir';
// import { processFile } from './processFile';
// import { processSpecialFile } from './processSpecialFile';

// export async function BuildWorkspace() {
// 	const { router, outputDir } = globalThis.BLUNTJS;
// 	console.log('BUILDING WORKSPACE: ', outputDir);

// 	// Read all files and construct a tree of files
// 	interface RouteType {
// 		get: () => void;
// 		'#': {
// 			page: string;
// 			route: string;
// 			template: string;
// 			layout: string;
// 			loading: string;
// 			middleware: string;
// 			error: string;
// 			notFound: string;
// 			forbidden: string;
// 			unauthorized: string;
// 		};
// 		[key: string]: RouteType;
// 	}
// 	function _resolveRoute(_route: string) {
// 		return; // eval(`routes.${route}`);
// 	}
// 	const _routes: { [key: string]: RouteType } = {
// 		// Priority of execution = middleware -> template -> layout -> loading -> route / page -> notFound / error / forbidden / unauthorized
// 		// dashboard: {
// 		// 	get() {
// 		// 		// get("route")
// 		// 		// getAll("layout")
// 		// 		// nearest("notFound")
// 		// 	},
// 		// 	'#': {
// 		// 		page: '',
// 		// 		route: '',
// 		// 		template: '',
// 		// 		layout: '',
// 		// 		loading: '',
// 		// 		middleware: '',
// 		// 		error: '',
// 		// 		notFound: '',
// 		// 		forbidden: '',
// 		// 		unauthorized: '',
// 		// 	},
// 		// 	'route-1': {
// 		// 		get() {},
// 		// 	},
// 		// },
// 	};

// 	// Create the root node of the trie
// 	const _rootNode: RouteNode = {
// 		children: {},
// 		dynamicSegments: {},
// 		fullPath: '/',
// 		metadata: {},
// 		segment: '',
// 	};
// 	// add option to add(), remove()

// 	// Scan all directories
// 	// for (const dir of router.dir.include) {
// 	// 	scanDirectory(dir, []);
// 	// }
// 	scanDirectory(router.dir, []);

// 	async function scanDirectory(dir: string, triePath: string[]) {
// 		// TODO: Filter if path is EXCLUDED
// 		// Skip directories that match exclude patterns
// 		// if (exclude.some((pattern) => new RegExp(pattern).test(itemPath)))
// 		// 	continue;

// 		const files = await readdir(dir);

// 		for (const fileName of files) {
// 			const item = file(join(dir, fileName));
// 			const isFile = await item.exists();
// 			const isSpecialFile = SPECIAL_FILES.includes(fileName);

// 			if (!isFile) {
// 				const result = processDir(fileName, triePath);
// 				scanDirectory(result.dir, result.triePath);
// 			} else if (!isSpecialFile) {
// 				processFile();
// 			} else {
// 				processSpecialFile();
// 			}
// 		}
// 	}

// 	// Build
// 	// const result = await Bun.build({
// 	// 	entrypoints: ['blunt/core/dev/constants/index.html'], // !
// 	// 	outdir: outputDir,
// 	// 	minify: false,
// 	// 	splitting: false,
// 	// 	sourcemap: 'linked',
// 	// 	// banner: "use client"
// 	// 	// define: {}
// 	// 	//   define: {
// 	// 	//     "process.env.NODE_ENV": JSON.stringify("production"),
// 	// 	//   },
// 	// 	// env
// 	// 	// minify: true,
// 	// 	// splitting: true,
// 	// 	// bytecode: true,
// 	// 	target: 'browser',
// 	// 	publicPath: '/_public/',
// 	// 	plugins: [TailwindPlugin],
// 	// });
// 	// console.log(result.outputs);
// }
