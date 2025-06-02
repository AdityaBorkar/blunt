import { Form } from '../form';

function getRandomValue() {
	const v = Math.random();
	console.log(v);
	return v;
}

export default function Page() {
	const offset = 100;
	return (
		<Form
			bar={async () => {
				'use cache';
				return offset + getRandomValue();
			}}
			baz={async () => {
				'use cache';
				return offset + getRandomValue();
			}}
			foo={async function fooNamed() {
				'use cache';
				return offset + getRandomValue();
			}}
		/>
	);
}
