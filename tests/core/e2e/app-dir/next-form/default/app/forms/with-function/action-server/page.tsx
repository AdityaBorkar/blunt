import Form from 'next/form';
import { redirect } from 'next/navigation';

export default function Page() {
	return (
		<Form
			action={async (data) => {
				'use server';
				redirect(
					'/redirected-from-action' +
						'?' +
						new URLSearchParams([...data.entries()] as [string, string][]),
				);
			}}
			id="search-form"
		>
			<input name="query" />

			<button type="submit">Submit (server action)</button>
		</Form>
	);
}
