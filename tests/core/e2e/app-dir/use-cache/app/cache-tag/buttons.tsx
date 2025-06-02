import { unstable_expirePath, unstable_expireTag } from 'next/cache';

export function RevalidateButtons() {
	return (
		<form>
			<button
				formAction={async () => {
					'use server';
					unstable_expireTag('a');
				}}
				id="revalidate-a"
			>
				revalidate a
			</button>{' '}
			<button
				formAction={async () => {
					'use server';
					unstable_expireTag('b');
				}}
				id="revalidate-b"
			>
				revalidate b
			</button>{' '}
			<button
				formAction={async () => {
					'use server';
					unstable_expireTag('c');
				}}
				id="revalidate-c"
			>
				revalidate c
			</button>{' '}
			<button
				formAction={async () => {
					'use server';
					unstable_expireTag('f');
				}}
				id="revalidate-f"
			>
				revalidate f
			</button>{' '}
			<button
				formAction={async () => {
					'use server';
					unstable_expireTag('r');
				}}
				id="revalidate-r"
			>
				revalidate r
			</button>{' '}
			<button
				formAction={async () => {
					'use server';
					unstable_expirePath('/cache-tag');
				}}
				id="revalidate-path"
			>
				revalidate path
			</button>
		</form>
	);
}
