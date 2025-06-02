import { revalidatePath, revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';

export default function Page() {
	return (
		<form>
			<button
				formAction={async () => {
					'use server';

					revalidateTag('revalidate-and-redirect');
					redirect('/revalidate-and-redirect');
				}}
				id="revalidate-tag-redirect"
			>
				Revalidate tag and redirect
			</button>{' '}
			<button
				formAction={async () => {
					'use server';

					revalidatePath('/revalidate-and-redirect');
					redirect('/revalidate-and-redirect');
				}}
				id="revalidate-path-redirect"
			>
				Revalidate path and redirect
			</button>
		</form>
	);
}
