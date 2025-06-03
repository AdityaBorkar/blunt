import { exists, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { color } from 'bun' with { type: 'macro' };
import { serve as BunServe } from 'bun';

import { importEnvFiles } from '@/server/lib/envImport';
import { buildRouter } from '@/server/serve/build/router';
import type { ProjectConfig } from '@/types';

export async function serve(config: ProjectConfig) {
	// Performance and Logging
	const SERVER_BUILD_START = performance.now();
	console.log(color('hotpink', 'ansi'));
	console.log('Blunt v1.2.3 | Bun v1.1.19'); // TODO: Add version
	console.log(color('lightgray', 'ansi'));
	console.log('Starting Server...');
	console.log('--------------------------------');

	// Setup Environment
	const ENVIRONMENT = process.env.NODE_ENV ?? 'development';
	const ENV_FILES = importEnvFiles({ env: ENVIRONMENT });
	console.log('Environment    : ', ENVIRONMENT);
	console.log('Env Files      : ', ENV_FILES.join(', '));

	// Expose Host
	const EXPOSE_HOST = true;
	if (EXPOSE_HOST) {
		config.server.host = '0.0.0.0';
	}

	// Implement HTTPS
	// if (
	// 	config.server.https === 'auto-generate' &&
	// 	config.server.certFile === 'auto-generate'
	// ) {
	// 	const { keyFile, certFile } = await generateHttps();
	// 	config.server.keyFile = keyFile;
	// 	config.server.certFile = certFile;
	// }

	const WORKING_DIR = join(
		process.cwd(),
		ENVIRONMENT === 'development' ? '.blunt/unbundled/' : config.build.outDir,
	);
	if (await exists(WORKING_DIR)) {
		await rm(WORKING_DIR, { force: true, recursive: true });
		console.log(color('gray', 'ansi'), `Cleaned ${WORKING_DIR} directory`);
	} else {
		await mkdir(WORKING_DIR, { recursive: true });
	}
	if (ENVIRONMENT === 'development') {
		await writeFile(
			join(process.cwd(), './.blunt/unbundled/ErrorBoundary.tsx'),
			await readFile(join(__dirname, '../utils/ErrorBoundary.tsx')),
		);
	}

	// TODO: Create a `blunt.types.d.ts` file and validate it

	// // Build Ahead of Time
	// if (ENVIRONMENT !== 'production') await BuildWorkspace(); //
	// Mandatory File Checks
	// const RootLayout = router.files.match('layout.tsx');
	// if (!RootLayout) {
	// 	console.log(
	// 		color('red', 'ansi'),
	// 		'❌ RootLayout is not present in the pages directory',
	// 	);
	// }
	// const NotFound = router.files.match('not-found.tsx');
	// if (!NotFound) {
	// 	console.log(
	// 		color('red', 'ansi'),
	// 		'❌ NotFound is not present in the pages directory',
	// 	);
	// } TODO: Inject `ENV_FILES`

	const server = BunServe({
		development: {
			chromeDevToolsAutomaticWorkspaceFolders: true,
			console: true,
			hmr: false, // ENVIRONMENT !== 'production',
		},
		hostname: config.server.host,
		port: config.server.port,
		...(await buildRouter(config)),
	});

	// TODO: Implement Tunnel
	console.log('Local Network  : ', server.url.href);
	console.log(
		'Public Network : ',
		EXPOSE_HOST ? server.url.href : 'use --host to expose',
	);
	console.log('--------------------------------');

	// Performance and Logging
	const SERVER_BUILD_END = performance.now();
	const SERVER_BUILD_TIME = (SERVER_BUILD_END - SERVER_BUILD_START).toFixed(2);
	console.log(`Server Started in ${SERVER_BUILD_TIME}ms`);

	console.log(color('white', 'ansi'));
	return server;
}

// TODO: HMR Support
// Store routes in HMR data to persist between updates
// const HMR_STATE = import.meta.hot?.data.HMR_STATE ?? {
// 	routesDir: '',
// 	router: null,
// 	server: null,
// };

// Store state for HMR
// import.meta.hot.data.HMR_STATE = { routesDir, router, server };

// Total refresh on change of `blunt.config.ts`, `.env`

// await server.stop();
// await server.reload({ options })
