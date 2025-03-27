import { router, serve } from 'blunt';

await serve({
	dev: {
		dir: '.blunt',
		port: 3001,
	},
	build: {
		dir: '.build',
	},
	config: {
		ppr: false,
		ssr: true,
		streaming: false,
		timeout: 60,
		botDetection: true,
		// maxRequestBodySize,
	},
	routes: router.fileBased({
		include: ['src/app'],
		exclude: ['**/~*'],
	}),
	// routeSpecificConfig,
});

// const routeSpecificConfig = {
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
