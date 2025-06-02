'use server';

import { unstable_expirePath } from 'next/cache';
import { redirect } from 'next/navigation';

type State = {
	errors: Record<string, string>;
};

export async function action(_previousState: State, formData: FormData) {
	const name = formData.get('name');
	const revalidate = formData.get('revalidate');

	if (name !== 'justputit') {
		return { errors: { name: "Only 'justputit' is accepted." } };
	}

	if (revalidate === 'on') {
		unstable_expirePath('/redirect');
	}

	redirect('/redirect/other');
}
