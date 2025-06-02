import { notFound, redirect } from 'next/navigation';

async function action(formData) {
	'use server';
	redirect(
		'/header?name=' +
			formData.get('name') +
			'&hidden-info=' +
			formData.get('hidden-info'),
	);
}

async function nowhere() {
	'use server';
	notFound();
}

async function here() {
	'use server';
	// nothing
}

async function file(formData) {
	'use server';
	const file = formData.get('file');
	console.log('File name:', file.name, 'size:', file.size);
}

export default function Form() {
	const b = 1;
	async function add(a, formData) {
		'use server';
		// Bind variable, closure variable, and argument.
		redirect(`/header?result=${a + b + Number(formData.get('n'))}`);
	}

	async function add3(a, b, c) {
		'use server';
		redirect(`/header?result=${a + b + c}`);
	}

	return (
		<>
			<hr />
			<form action={action}>
				<input defaultValue="hi" hidden name="hidden-info" type="text" />
				<input id="name" name="name" required type="text" />
				<button id="submit" type="submit">
					Submit
				</button>
			</form>
			<hr />
			<form>
				<button formAction={nowhere} id="nowhere" type="submit">
					Go nowhere
				</button>
				<button formAction={here} id="here" type="submit">
					Go here
				</button>
			</form>
			<hr />
			<form action={file}>
				<input id="file" name="file" required type="file" />
				<button id="upload" type="submit">
					Upload file
				</button>
			</form>
			<hr />
			<form>
				<input id="n" name="n" required type="text" />
				<button formAction={add.bind(null, -2)} id="minus-one" type="submit">
					-1
				</button>
			</form>
			<hr />
			<form>
				<button
					formAction={add3.bind(null, 1).bind(null, 2).bind(null, 3)}
					id="add3"
					type="submit"
				>
					add3
				</button>
			</form>
		</>
	);
}
