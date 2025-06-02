'use server';

export const foo = async () => {
	return 'exported exported arrow function expression';
};

export async function bar() {
	return 'exported named function declaration';
}

export const baz = async () => 'exported anonymous function expression';

export const qux = async function quux() {
	return 'exported named function expression';
};

export default async () => {
	return 'default exported arrow function expression';
};
