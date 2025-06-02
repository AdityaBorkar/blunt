import { connection } from 'next/server';

import { someClass } from './styles.module.css';

function logError() {
	const error = new Error('Boom');
	console.error(error);
}

export default async function Page() {
	await connection();

	logError();
	return <p className={someClass}>Hello, Dave!</p>;
}
