import { nextTestSetup } from 'e2e-utils';

const targets = [
	'x-nextjs-rewritten-path',
	'x-nextjs-rewritten-query',
] as const;

type Target = (typeof targets)[number];

const cases: {
	name: string;
	pathname: string;
	only?: boolean;
	debug?: true;
	headers?: Record<string, string>;
	expected: Record<Target, string | null>;
}[] = [
	{
		expected: {
			'x-nextjs-rewritten-path': null,
			'x-nextjs-rewritten-query': null,
		},
		name: 'static HTML',
		pathname: '/',
	},
	{
		expected: {
			'x-nextjs-rewritten-path': null,
			'x-nextjs-rewritten-query': null,
		},
		headers: {
			RSC: '1',
		},
		name: 'static RSC',
		pathname: '/',
	},
	{
		expected: {
			'x-nextjs-rewritten-path': null,
			'x-nextjs-rewritten-query': null,
		},
		headers: {
			'Next-Router-Prefetch': '1',
			RSC: '1',
		},
		name: 'static Prefetch RSC',
		pathname: '/',
	},
	{
		expected: {
			'x-nextjs-rewritten-path': null,
			'x-nextjs-rewritten-query': null,
		},
		name: 'prerender HTML',
		pathname: '/hello/world',
	},
	{
		expected: {
			'x-nextjs-rewritten-path': null,
			'x-nextjs-rewritten-query': null,
		},
		headers: {
			RSC: '1',
		},
		name: 'prerendered RSC',
		pathname: '/hello/world',
	},
	{
		expected: {
			'x-nextjs-rewritten-path': null,
			'x-nextjs-rewritten-query': null,
		},
		headers: {
			'Next-Router-Prefetch': '1',
			RSC: '1',
		},
		name: 'prerendered Prefetch RSC',
		pathname: '/hello/world',
	},
	{
		expected: {
			'x-nextjs-rewritten-path': null,
			'x-nextjs-rewritten-query': null,
		},
		name: 'middleware rewrite HTML',
		pathname: '/hello/wyatt',
	},
	{
		expected: {
			'x-nextjs-rewritten-path': '/hello/admin',
			'x-nextjs-rewritten-query': 'key=value',
		},
		headers: {
			RSC: '1',
		},
		name: 'middleware rewrite RSC',
		pathname: '/hello/wyatt',
	},
	{
		// only: true,
		expected: {
			'x-nextjs-rewritten-path': '/hello/admin',
			'x-nextjs-rewritten-query': 'key=value',
		},
		headers: {
			'Next-Router-Prefetch': '1',
			RSC: '1',
		},
		name: 'middleware rewrite Prefetch RSC',
		pathname: '/hello/wyatt',
	},
	{
		expected: {
			'x-nextjs-rewritten-path': null,
			'x-nextjs-rewritten-query': null,
		},
		name: 'middleware rewrite dynamic HTML',
		pathname: '/hello/bob',
	},
	{
		expected: {
			'x-nextjs-rewritten-path': '/hello/bobby',
			'x-nextjs-rewritten-query': null,
		},
		headers: {
			RSC: '1',
		},
		name: 'middleware rewrite dynamic RSC',
		pathname: '/hello/bob',
	},
	{
		expected: {
			'x-nextjs-rewritten-path': '/hello/bobby',
			'x-nextjs-rewritten-query': null,
		},
		headers: {
			'Next-Router-Prefetch': '1',
			RSC: '1',
		},
		name: 'middleware rewrite dynamic Prefetch RSC',
		pathname: '/hello/bob',
	},
	{
		expected: {
			'x-nextjs-rewritten-path': null,
			'x-nextjs-rewritten-query': null,
		},
		name: 'dynamic HTML',
		pathname: '/hello/mary',
	},
	{
		expected: {
			'x-nextjs-rewritten-path': null,
			'x-nextjs-rewritten-query': null,
		},
		headers: {
			RSC: '1',
		},
		name: 'dynamic RSC',
		pathname: '/hello/mary',
	},
	{
		expected: {
			'x-nextjs-rewritten-path': null,
			'x-nextjs-rewritten-query': null,
		},
		headers: {
			'Next-Router-Prefetch': '1',
			RSC: '1',
		},
		name: 'dynamic Prefetch RSC',
		pathname: '/hello/mary',
	},
	{
		expected: {
			'x-nextjs-rewritten-path': null,
			'x-nextjs-rewritten-query': null,
		},
		name: 'dynamic HTML with query',
		pathname: '/hello/mary?key=value',
	},
	{
		expected: {
			'x-nextjs-rewritten-path': null,
			'x-nextjs-rewritten-query': null,
		},
		headers: {
			RSC: '1',
		},
		name: 'dynamic RSC with query',
		pathname: '/hello/mary?key=value',
	},
	{
		expected: {
			'x-nextjs-rewritten-path': null,
			'x-nextjs-rewritten-query': null,
		},
		headers: {
			'Next-Router-Prefetch': '1',
			RSC: '1',
		},
		name: 'dynamic Prefetch RSC with query',
		pathname: '/hello/mary?key=value',
	},
	{
		expected: {
			'x-nextjs-rewritten-path': null,
			'x-nextjs-rewritten-query': null,
		},
		name: 'next.config.js rewrites HTML',
		pathname: '/hello/sam',
	},
	{
		expected: {
			'x-nextjs-rewritten-path': '/hello/samantha',
			'x-nextjs-rewritten-query': null,
		},
		headers: {
			RSC: '1',
		},
		name: 'next.config.js rewrites RSC',
		pathname: '/hello/sam',
	},
	{
		expected: {
			'x-nextjs-rewritten-path': '/hello/samantha',
			'x-nextjs-rewritten-query': null,
		},
		headers: {
			'Next-Router-Prefetch': '1',
			RSC: '1',
		},
		name: 'next.config.js rewrites Prefetch RSC',
		pathname: '/hello/sam',
	},
	{
		expected: {
			'x-nextjs-rewritten-path': null,
			'x-nextjs-rewritten-query': null,
		},
		name: 'next.config.js rewrites static HTML',
		pathname: '/hello/other',
	},
	{
		expected: {
			'x-nextjs-rewritten-path': '/other',
			'x-nextjs-rewritten-query': null,
		},
		headers: {
			RSC: '1',
		},
		name: 'next.config.js rewrites static RSC',
		pathname: '/hello/other',
	},
	{
		expected: {
			'x-nextjs-rewritten-path': '/other',
			'x-nextjs-rewritten-query': null,
		},
		headers: {
			'Next-Router-Prefetch': '1',
			RSC: '1',
		},
		name: 'next.config.js rewrites static Prefetch RSC',
		pathname: '/hello/other',
	},
	{
		expected: {
			'x-nextjs-rewritten-path': null,
			'x-nextjs-rewritten-query': null,
		},
		name: 'next.config.js rewrites external URL',
		pathname: '/hello/google',
	},
	{
		expected: {
			'x-nextjs-rewritten-path': null,
			'x-nextjs-rewritten-query': null,
		},
		name: 'middleware rewrite query HTML',
		pathname: '/hello/john',
	},
	{
		expected: {
			'x-nextjs-rewritten-path': null,
			'x-nextjs-rewritten-query': 'key=value',
		},
		headers: {
			RSC: '1',
		},
		name: 'middleware rewrite query RSC',
		pathname: '/hello/john',
	},
	{
		expected: {
			'x-nextjs-rewritten-path': null,
			'x-nextjs-rewritten-query': 'key=value',
		},
		headers: {
			'Next-Router-Prefetch': '1',
			RSC: '1',
		},
		name: 'middleware rewrite query Prefetch RSC',
		pathname: '/hello/john',
	},
	{
		expected: {
			'x-nextjs-rewritten-path': null,
			'x-nextjs-rewritten-query': null,
		},
		name: 'middleware rewrite external HTML',
		pathname: '/hello/vercel',
	},
	// TODO: These next two scenarios are dependent on how the Vercel site has
	// configured its rewrites, and thus are prone to be flaky. Figure out what
	// Next.js logic this is supposed to test.
	// {
	//   name: 'middleware rewrite external RSC',
	//   pathname: '/hello/vercel',
	//   headers: {
	//     RSC: '1',
	//   },
	//   expected: {
	//     // Vercel matches `/` to `/home`
	//     'x-nextjs-rewritten-path': '/home',
	//     'x-nextjs-rewritten-query': null,
	//   },
	// },
	// {
	//   name: 'middleware rewrite external Prefetch RSC',
	//   pathname: '/hello/vercel',
	//   headers: {
	//     RSC: '1',
	//     'Next-Router-Prefetch': '1',
	//   },
	//   expected: {
	//     // Vercel matches `/` to `/home`
	//     'x-nextjs-rewritten-path': '/home',
	//     'x-nextjs-rewritten-query': null,
	//   },
	// },
	{
		expected: {
			'x-nextjs-rewritten-path': null,
			'x-nextjs-rewritten-query': null,
		},
		name: 'next.config.js rewrites with query HTML',
		pathname: '/hello/fred',
	},
	{
		expected: {
			'x-nextjs-rewritten-path': '/other',
			'x-nextjs-rewritten-query': 'key=value',
		},
		headers: {
			RSC: '1',
		},
		name: 'next.config.js rewrites with query RSC',
		pathname: '/hello/fred',
	},
	{
		expected: {
			'x-nextjs-rewritten-path': '/other',
			'x-nextjs-rewritten-query': 'key=value',
		},
		headers: {
			'Next-Router-Prefetch': '1',
			RSC: '1',
		},
		name: 'next.config.js rewrites with query Prefetch RSC',
		pathname: '/hello/fred',
	},
];

describe('rewrite-headers', () => {
	const { next } = nextTestSetup({
		files: __dirname,
		// TODO: re-enable once changes in infrastructure are merged
		skipDeployment: true,
	});

	describe.each(cases)(
		'$name ($pathname)',
		({ pathname, headers = {}, expected }) => {
			let response;
			beforeAll(async () => {
				response = await next.fetch(pathname, { headers });
				if (response.status !== 200) {
					throw new Error(
						`Expected status 200, got ${response.status} for ${pathname}`,
					);
				}
			});

			it('should have the expected headers', () => {
				const headers = Object.fromEntries(response.headers.entries());

				// This is so that the following check works. If we expect that the
				// header is null, but it's not present, we need to set it to null.
				Object.entries(expected).forEach(([key, value]) => {
					if (value === null && !headers[key]) {
						headers[key] = null;
					}
				});

				// Remove any headers that we're not testing for to simplify the test
				// output.
				Object.keys(headers).forEach((key) => {
					if (!targets.includes(key as Target)) {
						delete headers[key];
					}
				});

				expect(headers).toEqual(expected);
			});
		},
	);
});
