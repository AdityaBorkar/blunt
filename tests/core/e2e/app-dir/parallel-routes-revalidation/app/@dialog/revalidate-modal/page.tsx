import { unstable_expirePath } from 'next/cache';
import Link from 'next/link';

import { addData } from '../../actions';

export default function Page() {
	async function createItem() {
		'use server';

		await addData(new Date().toISOString());

		unstable_expirePath('/', 'layout');
	}

	return (
		<dialog open>
			<h1>Modal</h1>

			<br />

			<form action={createItem}>
				<button className="button" id="create-entry" type="submit">
					Create New Item
				</button>
			</form>

			<Link href="/">Close</Link>
		</dialog>
	);
}
