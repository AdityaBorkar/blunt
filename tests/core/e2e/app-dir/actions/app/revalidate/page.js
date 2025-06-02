import { unstable_expirePath, unstable_expireTag } from 'next/cache';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { redirect } from 'next/navigation';

import RedirectClientComponent from './client';

export default async function Page() {
	const data = await fetch(
		'https://next-data-api-endpoint.vercel.app/api/random?page',
		{
			next: { revalidate: 3600, tags: ['thankyounext'] },
		},
	).then((res) => res.text());

	const data2 = await fetch(
		'https://next-data-api-endpoint.vercel.app/api/random?a=b',
		{
			next: { revalidate: 3600, tags: ['thankyounext', 'justputit'] },
		},
	).then((res) => res.text());

	return (
		<>
			<p>/revalidate</p>
			<p>
				{' '}
				revalidate (tags: thankyounext): <span id="thankyounext">{data}</span>{' '}
				<span>
					<Link href="/revalidate-2" id="another">
						/revalidate-2
					</Link>
				</span>
			</p>
			<p>
				revalidate (tags: thankyounext, justputit):{' '}
				<span id="justputit">{data2}</span>
			</p>
			<p>
				random cookie:{' '}
				<span id="random-cookie">
					{JSON.stringify((await cookies()).get('random'))}
				</span>
			</p>
			<form>
				<button
					formAction={async () => {
						'use server';
						(await cookies()).set('random', `${Math.random()}`);
					}}
					id="set-cookie"
				>
					set cookie
				</button>
			</form>
			<form>
				<button
					formAction={async () => {
						'use server';
						unstable_expireTag('thankyounext');
					}}
					id="revalidate-thankyounext"
				>
					revalidate thankyounext
				</button>
			</form>
			<form>
				<button
					formAction={async () => {
						'use server';
						unstable_expireTag('justputit');
					}}
					id="revalidate-justputit"
				>
					revalidate justputit
				</button>
			</form>
			<form>
				<button
					formAction={async () => {
						'use server';
						unstable_expirePath('/revalidate');
					}}
					id="revalidate-path"
				>
					revalidate path
				</button>
			</form>
			<form>
				<button
					formAction={async () => {
						'use server';
						unstable_expireTag('justputit');
						redirect('/revalidate');
					}}
					id="revalidate-path-redirect"
				>
					revalidate justputit + redirect
				</button>
			</form>
			<form>
				<button
					formAction={async () => {
						'use server';
						redirect('/revalidate');
					}}
					id="redirect"
				>
					redirect
				</button>
			</form>
			<form>
				<button
					formAction={async () => {
						'use server';
						unstable_expireTag('justputit');
						redirect('/revalidate?foo=bar');
					}}
					id="redirect-revalidate"
				>
					redirect + revalidate
				</button>
			</form>
			<RedirectClientComponent
				action={async () => {
					'use server';
					unstable_expireTag('justputit');
				}}
			/>
		</>
	);
}
