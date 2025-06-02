import { exists, resolve } from 'node:path';
import { type } from 'arktype';

import { FrameworkAdapters } from './framework-adapters';

const ProjectConfigSchema = type({
	build: {
		analyze: 'boolean',
		bundler: 'enum',
		cloud: 'enum',
		linter: 'enum',
		minify: 'boolean',
		outDir: 'string',
		sourcemap: 'boolean',
	},
	pages: {
		botDetection: 'boolean | () => boolean',
		maxRequestBodySize: 'number',
		ppr: 'boolean',
		spa: 'boolean',
		ssr: 'boolean',
		streaming: 'boolean',
		timeout: 'number',
	},
	react: {
		profiler: 'boolean',
		strictMode: 'boolean',
	},
	routes: {
		botDetection: 'boolean | () => boolean',
		maxRequestBodySize: 'number',
		timeout: 'number',
	},
	server: {
		hostname: 'string',
		port: 'number',
		public: 'string',
		router: 'any[]',
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
		const isFile = await exists(path);
		if (isFile) return path;
	}
	return null;
}

export async function getProjectConfig(): Promise<ProjectConfig> {
	const path = await getProjectConfigPath();
	if (!path) throw new Error('No Blunt project found');

	const file = await import(resolve(path));
	const _config = file.default;
	const $config = ProjectConfigSchema.parse(_config);
	const config = { ...DEFAULT_GLOBAL_CONFIG, ...$config };
	return { config, path };
}

const DEFAULT_GLOBAL_CONFIG = {
	build: {
		analyze: true,
		bundler: FrameworkAdapters.Bun,
		cloud: FrameworkAdapters.Vercel,
		linter: FrameworkAdapters.Biome,
		minify: true,
		outDir: '.build',
		sourcemap: false,
	},
	react: {
		profiler: false,
		strictMode: process.env.NODE_ENV === 'development', // process.env.NODE_ENV === 'development',
		// Million Lint / React Scan / React DevTools
	},
	server: {
		hostname: 'localhost',
		https: true,
		port: 3000,
		public: 'public',
		router: ['src/app'],
	},
} satisfies ProjectConfig;
