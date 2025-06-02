import { nanoid } from 'nanoid';
import Link from 'next/link';

export default function Page() {
	return (
		<>
			<h1 id="render-id">{nanoid()}</h1>
			<Link href="/link-hard-replace" id="self-link" replace>
				Self Link
			</Link>
			<Link href="/link-hard-replace/subpage" id="subpage-link" replace>
				Subpage
			</Link>
		</>
	);
}
