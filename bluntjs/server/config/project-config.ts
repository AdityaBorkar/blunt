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
		// cssChunking: 'boolean',
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
	routes: {
		botDetection: 'boolean | Function',
		edge: 'boolean',
		// maxRequestBodySize: 'number',
		// maxHeadersLength: 'number',
		timeout: 'number',
	},
	server: {
		dev: type({
			allowOrigin: 'string[]',
			buildEager: 'boolean',
			exposeHost: 'boolean',
			outDir: 'string',
			tunnel: 'boolean',
		}),
		host: 'string',
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
					type({ file: 'string' }, '|', { dir: 'string' }),
					'|',
					type({ page: 'string' }, '|', {
						'delete?': 'string',
						'get?': 'string',
						'head?': 'string',
						'options?': 'string',
						'patch?': 'string',
						'post?': 'string',
						'put?': 'string',
					}),
				),
			}),
			rules:
				'("ALLOW_NESTED_MIDDLEWARE_IN_PAGES" | "ALLOW_MIXING_PAGES_AND_ROUTES" | "USE_MIDDLEWARE_FOR_REACT_SERVER_ACTIONS")[]',
			trailingSlash: 'boolean',
		}),
		// unix?: string;
		// ipv6Only?: boolean;
		// reusePort?: boolean;
		// compress?: 'gzip' | 'brotli' | 'none';
		// chunking?: {
		// 	js?: boolean;
		// 	css?: boolean;
		// };
		// https: 'boolean',
		// https?: {
		// 	keyFile?: string | 'auto-generate' | (() => Promise<string>);
		// 	certFile?: string | 'auto-generate' | (() => Promise<string>);
		// };
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
