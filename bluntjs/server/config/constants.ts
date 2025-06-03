import { FrameworkAdapters } from '@/server/config/framework-adapters';
import type { ProjectConfig } from '@/server/config/project-config';

export const DEFAULT_GLOBAL_CONFIG = {
	// TODO: Write defaults properly
	build: {
		analyze: true,
		bundler: FrameworkAdapters.Bun,
		cloud: FrameworkAdapters.Vercel,
		linter: FrameworkAdapters.Biome,
		minify: true,
		outDir: '.build',
		sourcemap: false,
	},
	pages: {
		maxRequestBodySize: 1024 * 1024 * 10, // 10MB
		ppr: false,
		spa: false,
		ssr: false,
		streaming: false,
		timeout: 60,
	},
	react: {
		compiler: false,
		profiler: false,
		strictMode: process.env.NODE_ENV === 'development',
		// reactScan: false,
		// millionLint: false,
	},
	routes: {
		maxRequestBodySize: 1024 * 1024 * 10, // 10MB
		timeout: 60,
	},
	server: {
		host: 'localhost',
		port: 3000,
		public: 'public',
		router: {
			'/': 'src/app',
		},
		// https: true,
		// router: ['src/app'],
	},
} satisfies ProjectConfig;
