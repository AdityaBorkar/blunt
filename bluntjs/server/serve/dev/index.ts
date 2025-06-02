import { color } from 'bun' with { type: 'macro' };
import type { ServeOptions } from 'bun';
import { serve as BunServe } from 'bun';

import type { ProjectConfig } from '../../../types/types';
import { BuildWorkspace } from './build';
import { Router } from './builder';
import { handleError } from './compiler/handleError';
import { handleFetch } from './compiler/handleFetch';
import { importEnvFiles } from './utils/envImport';
import { generateHttps } from './utils/generateHttps';
import { prepareWorkspace } from './utils/prepareWorkspace';

declare global {
	var BLUNTJS: {
		config: ProjectConfig;
		outputDir: string;
		router: Awaited<ReturnType<typeof Router>>;
	};
}

export async function serve(props: ProjectConfig) {
	// Performance and Logging
	const SERVER_BUILD_START = performance.now();
	console.log(color('hotpink', 'ansi'));
	console.log('Blunt v1.2.3 | Bun v1.1.19');
	console.log(color('gray', 'ansi'));
	console.log('Server Starting...');

	// Prepare Workspace
	prepareWorkspace();

	// Setup Environment
	const ENVIRONMENT = process.env.NODE_ENV ?? 'development';
	const ENV_FILES = importEnvFiles({ dir: routes, env: ENVIRONMENT });

	// Setup Bun Server Properties
	const options = ENVIRONMENT === 'production' ? build : dev;
	const bunServerProps = {
		development: ENVIRONMENT !== 'production',
		hostname: options?.hostname,
		ipv6Only: options?.ipv6Only,
		// unix: options?.unix,
		port: options?.port,
		reusePort: options?.reusePort,
	} satisfies Omit<ServeOptions, 'fetch'>;
	const outputDir =
		(options?.dir ?? ENVIRONMENT === 'production') ? '.build' : '.blunt';

	// Expose Host
	const EXPOSE_HOST = false;
	if (EXPOSE_HOST) {
		//  TODO: Figure out how to expose the host
	}

	// Implement HTTPS
	if (props.keyFile === 'auto-generate' && props.certFile === 'auto-generate') {
		const { keyFile, certFile } = await generateHttps();
		props.keyFile = keyFile;
		props.certFile = certFile;
	}

	// *** HMR START ***

	// Context
	const router = await Router({ dir: routes });
	globalThis.BLUNTJS = { GLOBAL_CONFIG, outputDir, router };

	// Build Ahead of Time
	if (ENVIRONMENT !== 'production') await BuildWorkspace(); // TODO: Inject `ENV_FILES`

	// Server
	const server = BunServe({
		...bunServerProps,
		error: handleError,
		fetch: handleFetch,
		// TODO: Implement Websockets
		// TODO: Implement SSE
	});

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
	// }

	// *** HMR END ***

	// TODO: Implement Tunnel

	// Performance and Logging
	const SERVER_BUILD_END = performance.now();
	const SERVER_BUILD_TIME = (SERVER_BUILD_END - SERVER_BUILD_START).toFixed(2);
	console.log(`Server Started in ${SERVER_BUILD_TIME}ms`);
	console.log('Local Network  : ', server.url.href);
	console.log(
		'Public Network : ',
		EXPOSE_HOST ? server.url.href : 'use --host to expose',
	);
	console.log('Environments   : ', ENV_FILES.join(', '));

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
