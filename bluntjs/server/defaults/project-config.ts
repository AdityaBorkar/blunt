import { FrameworkAdapters } from '@/server/config/framework-adapters';
import type { ProjectConfig } from '@/server/config/project-config';

// TODO: Write defaults properly
export const DEFAULT_PROJECT_CONFIG = {
	build: {
		analyze: true,
		bundler: FrameworkAdapters.Bun,
		cloud: FrameworkAdapters.Vercel,
		compress: 'gzip',
		linter: FrameworkAdapters.Biome,
		minify: true,
		sourcemap: false,
	},
	pages: {
		botDetection: false,
		edge: true,
		// maxRequestBodySize: 1024 * 1024 * 10,
		ppr: false,
		spa: false,
		ssr: false,
		streaming: false,
		timeout: 60,
	},
	react: {
		compiler: false,
		profiler: false,
		strictMode: true, // process.env.NODE_ENV === 'development',
		// reactScan: false,
		// millionLint: false,
	},
	routes: {
		botDetection: false,
		edge: true,
		// maxRequestBodySize: 1024 * 1024 * 10,
		timeout: 60,
	},
	server: {
		dev: {
			allowOrigin: [],
			buildEager: false,
			debuggerPath: '/blunt',
			exposeHost: true,
			outDir: '.blunt',
			toolbar: 'bottom-center',

			tunnel: false,
		},
		host: 'localhost',
		https: 'auto-generate',
		outDir: 'dist',
		port: 3000,
		router: {
			public: 'public',
			redirects: [],
			rewrites: [],
			routes: {
				'/': { dir: 'src/app' },
			},
			rules: [],
			trailingSlash: true,
		},
		// https: true,
		// router: ['src/app'],
	},
} satisfies ProjectConfig;
