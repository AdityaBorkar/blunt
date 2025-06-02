import Link from 'next/link';

import defaultAction1, { bar, baz, foo, qux } from './actions1';
import defaultAction2 from './actions2';
import defaultAction3 from './actions3';
import { Form } from './form';
import { ServerComponent } from './server-component';

export default function Page() {
	const action1 = async () => {
		'use server';

		return 'declarator arrow function expression';
	};

	async function action2() {
		'use server';

		return 'function declaration';
	}

	return (
		<main>
			<ServerComponent />
			<Form action={defaultAction1} id="form-1" />
			<Form action={defaultAction2} id="form-2" />
			<Form action={defaultAction3} id="form-3" />
			<Form action={foo} id="form-4" />
			<Form action={bar} id="form-5" />
			<Form action={baz} id="form-6" />
			<Form action={qux} id="form-7" />
			<Form action={action1} id="form-8" />
			<Form action={action2} id="form-9" />
			<Form
				action={async () => {
					'use server';

					return 'arrow function expression';
				}}
				id="form-10"
			/>
			<Form
				action={async () => {
					'use server';

					return 'anonymous function expression';
				}}
				id="form-11"
			/>
			<Form
				action={async function myAction() {
					'use server';

					return 'named function expression';
				}}
				id="form-12"
			/>
			<Link href="/client">client component page</Link>
		</main>
	);
}
