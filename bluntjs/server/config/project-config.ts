import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { ArkErrors, type } from 'arktype';
import merge from 'lodash.merge';

import { DEFAULT_GLOBAL_CONFIG } from '@/server/config/constants';

const ProjectConfigSchema = type({
	build: {
		analyze: 'boolean',
		bundler: "'bun' | 'vite'",
		cloud: "'aws' | 'cloudflare' | 'vercel'",
		linter: "'biome' | 'eslint'",
		minify: 'boolean',
		outDir: 'string',
		sourcemap: 'boolean',
	},
	pages: {
		// botDetection: 'boolean | (() => boolean)',
		maxRequestBodySize: 'number',
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
		// botDetection: 'boolean | (() => boolean)',
		maxRequestBodySize: 'number',
		timeout: 'number',
	},
	server: {
		host: 'string',
		port: 'number',
		public: 'string',
		router: 'Record<string, string | Function>',
		'router_rules?':
			'("ALLOW_NESTED_MIDDLEWARE_IN_PAGES" | "ALLOW_MIXING_PAGES_AND_ROUTES")[]',
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
	const mergedConfig = merge(DEFAULT_GLOBAL_CONFIG, projectConfig);
	const config = ProjectConfigSchema(mergedConfig);
	if (config instanceof ArkErrors) {
		const errors = config.map((error) => error.message);
		console.log({ errors });
		throw new Error(`Invalid Blunt project config`); // TODO: Better error message
	}
	return { config, path };
}
