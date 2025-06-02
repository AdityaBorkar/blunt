import { redirect } from 'next/navigation';

export default function Page() {
	return (
		<form
			action={async () => {
				'use server';
				redirect('/');
			}}
		>
			<button id="redirect-page" type="submit">
				Redirect
			</button>
		</form>
	);
}
