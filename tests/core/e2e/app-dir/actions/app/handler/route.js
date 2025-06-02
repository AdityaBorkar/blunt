import { cookies } from 'next/headers';

export const revalidate = 1;

export const GET = async () => {
	const localCookies = await cookies();
	localCookies.set('foo', 'foo1');
	localCookies.set('bar', 'bar1');

	// Key, value, options
	localCookies.set('test1', 'value1', { secure: true });

	// One object
	localCookies.set({
		httpOnly: true,
		name: 'test2',
		path: '/handler',
		value: 'value2',
	});

	// Cookies here will be merged with the ones above
	return new Response('Hello, world!', {
		headers: [
			['Content-Type', 'text/custom'],
			['Set-Cookie', 'bar=bar2'],
			['Set-Cookie', 'baz=baz2'],
		],
	});
};
