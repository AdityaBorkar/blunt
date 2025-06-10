import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { ArkErrors, type } from 'arktype';
import merge from 'lodash.merge';

import { DEFAULT_PROJECT_CONFIG } from '@/server/defaults/project-config';

const ProjectConfigSchema = type({
	build: {
		analyze: 'boolean',
		bundler: "'bun' | 'vite'",
		cloud: "'aws' | 'cloudflare' | 'vercel'",
		compress: "'gzip' | 'brotli' | 'none'",
		// chunking?: {
		// 	js?: boolean;
		// 	css?: boolean;
		// };
		// optimizeMedia: 'boolean',
		// doNotOptimize: 'string[]', // This can include file path and package names.
		linter: "'biome' | 'eslint'",
		minify: 'boolean',
		sourcemap: 'boolean',
	},
	pages: {
		botDetection: 'boolean | Function',
		edge: 'boolean',
		// maxRequestBodySize: 'number',
		// maxHeadersLength: 'number',
		ppr: 'boolean',
		spa: 'boolean',
		ssr: 'boolean',
		streaming: 'boolean',
		timeout: 'number',
	},
	react: {
		compiler: 'boolean | "annotation"', // TODO: Add "annotation" - "use react-compiler" / "use no react-compiler"
		profiler: 'boolean',
		strictMode: 'boolean',
	},
	// vue
	// svelte
	// preact
	// solid: {
	// 	profiler: 'boolean',
	// },
	routes: {
		botDetection: 'boolean | Function',
		edge: 'boolean',
		// maxRequestBodySize: 'number',
		// maxHeadersLength: 'number',
		timeout: 'number',
	},
	server: {
		// unix?: string;
		// ipv6Only?: boolean;
		// reusePort?: boolean;
		dev: type({
			allowOrigin: 'string[]',
			buildEager: 'boolean',
			debuggerPath: 'string',
			exposeHost: 'boolean',
			outDir: 'string',
			toolbar: 'string',
			tunnel: 'boolean',
		}),
		host: 'string',
		https: type(
			'"auto-generate"',
			'|',
			type({
				certFile: 'string | Function',
				keyFile: 'string | Function',
			}),
		),
		outDir: 'string',
		port: 'number',
		router: type({
			public: 'string',
			redirects: type(
				{ code: '307 | 308', from: 'string', to: 'string' },
				'[]',
			),
			rewrites: type({ from: 'string', to: 'string' }, '[]'),
			routes: type({
				'[string]': type(
					// This type string does support Next.js based routing splats
					type({ dir: 'string' }),
					'|',
					type({ page: 'string | Function' }, '|', {
						'delete?': 'string | Function',
						'get?': 'string | Function',
						'head?': 'string | Function',
						'options?': 'string | Function',
						'patch?': 'string | Function',
						'post?': 'string | Function',
						'put?': 'string | Function', // "GET": "file/path.default" / Function
					}),
				),
			}),
			rules:
				'("ALLOW_NESTED_MIDDLEWARE_IN_PAGES" | "ALLOW_MIXING_PAGES_AND_ROUTES" | "USE_MIDDLEWARE_FOR_REACT_SERVER_ACTIONS")[]',
			trailingSlash: 'boolean',
		}),
	},
});

export type ProjectConfig = typeof ProjectConfigSchema.infer;

async function getProjectConfigPath(): Promise<string | null> {
	const indicators = ['blunt.config.ts', 'blunt.config.js'];
	for (const indicator of indicators) {
		const path = resolve(process.cwd(), indicator);
		const isFile = existsSync(path);
		if (isFile) return path;
	}
	return null;
}

export async function getProjectConfig() {
	const path = await getProjectConfigPath();
	if (!path) throw new Error('No Blunt project found');

	const file = await import(resolve(path));
	const projectConfig = file.default;
	const mergedConfig = merge(DEFAULT_PROJECT_CONFIG, projectConfig);
	const config = ProjectConfigSchema(mergedConfig);
	if (config instanceof ArkErrors) {
		const errors = config.map((error) => error.message);
		console.log({ errors });
		throw new Error(`Invalid Blunt project config`); // TODO: Better error message
	}
	return { config, path };
}
