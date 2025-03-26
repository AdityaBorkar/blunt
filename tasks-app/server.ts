import { router, serve } from 'blunt';
import type { BluntGlobalConfig } from '#/blunt/types';

await serve({
	development: process.env.NODE_ENV !== 'production',
	// routes: TrieBasedRouting('src/app'),
	dev: {
		dir: '#/.blunt',
		// 	env: {},
		// 	hostname: 'localhost',
		port: 3001,
		// 	tunnel: CloudflareTunnel(),
	},
	build: {
		dir: '#/.build',
	},
	// keyFile: 'auto-generate',
	// keyFile: process.env.SSL_KEY_FILE || './key.pem',
	// certFile: 'auto-generate',
	// certFile: process.env.SSL_CERTIFICATE_FILE || './cert.pem',
	routes: router.fileBased({
		include: ['src/app'],
		exclude: ['**/~*'],
	}),
	config: {
		ppr: false,
		ssr: true,
		streaming: false,
		timeout: 60,
		botDetection: true,
		// maxRequestBodySize,
	},
	// routeSpecificConfig,
});

// const pageSpecificConfig = {
// 	'/route-path-name': {
// 		ssr: false,
// 		streaming: false,
// 		timeout: 60,
// 		// headers: {},
// 		// cookies: {},
// 	},
// 	'/route-path-name-2': redirect('/route-path-name', { permanent: true }),
// 	'/route-path-name-2': rewrite('/route-path-name'),
// https://nextjs.org/docs/app/api-reference/config/next-config-js/redirects#header-cookie-and-query-matching
// };
