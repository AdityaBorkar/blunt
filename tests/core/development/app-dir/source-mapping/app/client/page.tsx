'use client';

import Link from 'next/link';

import defaultAction1, { bar, baz, foo, qux } from '../actions1';
import defaultAction2 from '../actions2';
import defaultAction3 from '../actions3';
import { Form } from '../form';

export default function Page() {
	return (
		<main>
			<h1>client component page</h1>
			<Form action={defaultAction1} id="form-1" />
			<Form action={defaultAction2} id="form-2" />
			<Form action={defaultAction3} id="form-3" />
			<Form action={foo} id="form-4" />
			<Form action={bar} id="form-5" />
			<Form action={baz} id="form-6" />
			<Form action={qux} id="form-7" />
			<Link href="/">server component page</Link>
		</main>
	);
}
