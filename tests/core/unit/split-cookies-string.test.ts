import type { CookieSerializeOptions } from 'cookie';
import cookie from 'next/dist/compiled/cookie';
import { splitCookiesString } from 'next/dist/server/web/utils';

function generateCookies(
	...cookieOptions: (CookieSerializeOptions & { name: string; value: string })[]
) {
	const cookies = cookieOptions.map((opts) =>
		cookie.serialize(opts.name, opts.value, opts),
	);
	return {
		expected: cookies,
		joined: cookies.join(', '),
	};
}

describe('splitCookiesString', () => {
	describe('with a single cookie', () => {
		it('should parse a plain value', () => {
			const { joined, expected } = generateCookies({
				name: 'foo',
				value: 'bar',
			});
			const result = splitCookiesString(joined);
			expect(result).toEqual(expected);
		});

		it('should parse expires', () => {
			const { joined, expected } = generateCookies({
				expires: new Date(),
				name: 'foo',
				value: 'bar',
			});
			const result = splitCookiesString(joined);
			expect(result).toEqual(expected);
		});

		it('should parse max-age', () => {
			const { joined, expected } = generateCookies({
				maxAge: 10,
				name: 'foo',
				value: 'bar',
			});
			const result = splitCookiesString(joined);
			expect(result).toEqual(expected);
		});

		it('should parse path', () => {
			const { joined, expected } = generateCookies({
				name: 'foo',
				path: '/path',
				value: 'bar',
			});
			const result = splitCookiesString(joined);
			expect(result).toEqual(expected);
		});

		it('should parse with all the options', () => {
			const { joined, expected } = generateCookies({
				domain: 'https://foo.bar',
				expires: new Date(Date.now() + 10 * 1000),
				httpOnly: true,
				maxAge: 10,
				name: 'foo',
				path: '/path',
				sameSite: 'lax',
				secure: true,
				value: 'bar',
			});
			const result = splitCookiesString(joined);
			expect(result).toEqual(expected);
		});
	});

	describe('with a multiple cookies', () => {
		it('should parse a plain value', () => {
			const { joined, expected } = generateCookies(
				{
					name: 'foo',
					value: 'bar',
				},
				{
					name: 'x',
					value: 'y',
				},
			);
			const result = splitCookiesString(joined);
			expect(result).toEqual(expected);
		});

		it('should parse expires', () => {
			const { joined, expected } = generateCookies(
				{
					expires: new Date(),
					name: 'foo',
					value: 'bar',
				},
				{
					expires: new Date(),
					name: 'x',
					value: 'y',
				},
			);
			const result = splitCookiesString(joined);
			expect(result).toEqual(expected);
		});

		it('should parse max-age', () => {
			const { joined, expected } = generateCookies(
				{
					maxAge: 10,
					name: 'foo',
					value: 'bar',
				},
				{
					maxAge: 10,
					name: 'x',
					value: 'y',
				},
			);
			const result = splitCookiesString(joined);
			expect(result).toEqual(expected);
		});

		it('should parse path', () => {
			const { joined, expected } = generateCookies(
				{
					name: 'foo',
					path: '/path',
					value: 'bar',
				},
				{
					name: 'x',
					path: '/path',
					value: 'y',
				},
			);
			const result = splitCookiesString(joined);
			expect(result).toEqual(expected);
		});

		it('should parse with all the options', () => {
			const { joined, expected } = generateCookies(
				{
					domain: 'https://foo.bar',
					expires: new Date(Date.now() + 10 * 1000),
					httpOnly: true,
					maxAge: 10,
					name: 'foo',
					path: '/path',
					sameSite: 'lax',
					secure: true,
					value: 'bar',
				},
				{
					domain: 'https://x.y',
					expires: new Date(Date.now() + 20 * 1000),
					httpOnly: true,
					maxAge: 20,
					name: 'x',
					path: '/path',
					sameSite: 'strict',
					secure: true,
					value: 'y',
				},
			);
			const result = splitCookiesString(joined);
			expect(result).toEqual(expected);
		});
	});
});
