'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { revalidateAction } from '../../@modal/modal/action';

export default function Page() {
	const router = useRouter();

	const handleRevalidateSubmit = async () => {
		const result = await revalidateAction();
		if (result.success) {
			close();
		}
	};

	const close = () => {
		router.back();
	};

	return (
		<div className="fixed top-0 right-0 bottom-0 h-screen w-1/3 bg-gray-50 p-10 shadow-2xl">
			<h2 id="drawer">Drawer</h2>
			<p id="drawer-now">{Date.now()}</p>

			<button
				className="rounded border bg-gray-100 p-2"
				id="drawer-close-button"
				onClick={() => close()}
				type="button"
			>
				close
			</button>
			<p className="mt-4">Drawer</p>
			<div className="mt-4 flex flex-col gap-2">
				<Link
					className="rounded bg-sky-600 p-2 text-white"
					href="/nested-revalidate/modal"
				>
					Open modal
				</Link>
				<form action={handleRevalidateSubmit}>
					<button
						className="rounded bg-sky-600 p-2 text-white"
						id="drawer-submit-button"
						type="submit"
					>
						Revalidate submit
					</button>
				</form>
			</div>
		</div>
	);
}
