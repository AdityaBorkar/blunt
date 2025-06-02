'use server';

import { cookies, headers } from 'next/headers';
import { redirect } from 'next/navigation';

export async function setCookieWithMaxAge() {
	(await cookies()).set({
		maxAge: 1000,
		name: 'foo',
		value: 'bar',
	});
}

export async function getCookie(name) {
	return (await cookies()).get(name);
}

export async function getHeader(name) {
	return (await headers()).get(name);
}

export async function setCookie(name, value) {
	const localCookies = await cookies();
	localCookies.set(name, value);
	return localCookies.get(name);
}

export async function setCookieAndRedirect(name, value, path, type) {
	(await cookies()).set(name, value);
	redirect(path, type);
}
