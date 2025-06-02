import { revalidatePath, revalidateTag } from 'next/cache';
import Link from 'next/link';

import { FormAccordion, LinkAccordion } from '../components/link-accordion';

export default async function Page() {
	return (
		<>
			<form>
				<button
					formAction={async () => {
						'use server';
						revalidatePath('/greeting');
					}}
					id="revalidate-by-path"
				>
					Revalidate by path
				</button>
				<button
					formAction={async () => {
						'use server';
						revalidateTag('random-greeting');
					}}
					id="revalidate-by-tag"
				>
					Revalidate by tag
				</button>
			</form>
			<ul>
				<li>
					<LinkAccordion href="/greeting">
						Link to target page with prefetching enabled
					</LinkAccordion>
				</li>
				<li>
					<FormAccordion action="/greeting">
						Form pointing to target page with prefetching enabled
					</FormAccordion>
				</li>
				<li>
					<Link href="/greeting" prefetch={false}>
						Link to target with prefetching disabled
					</Link>
				</li>
			</ul>
		</>
	);
}
