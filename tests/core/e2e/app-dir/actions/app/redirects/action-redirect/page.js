import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function Page({ searchParams }) {
	const foo = (await cookies()).get('foo');
	const bar = (await cookies()).get('bar');
	return (
		<div>
			<h1>
				foo={foo ? foo.value : ''}; bar={bar ? bar.value : ''}
			</h1>
			<form
				action={async () => {
					'use server';
					(await cookies()).delete('foo');
					(await cookies()).set('bar', '2');
					redirect('/redirects/action-redirect/redirect-target');
				}}
			>
				<button id="redirect-with-cookie-mutation" type="submit">
					Set Cookies and Redirect
				</button>
			</form>
			<h2>baz={(await searchParams).baz ?? ''}</h2>
			<form
				action={async () => {
					'use server';
					redirect('/redirects/action-redirect/redirect-target?baz=1');
				}}
			>
				<button id="redirect-with-search-params" type="submit">
					Redirect with SearchParams
				</button>
			</form>
		</div>
	);
}
