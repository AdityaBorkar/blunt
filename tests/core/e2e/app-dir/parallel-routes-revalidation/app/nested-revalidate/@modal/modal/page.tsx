'use client';

import { useRouter } from 'next/navigation';

import { revalidateAction } from './action';

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
		<div className="fixed top-20 right-0 left-0 z-10 m-auto w-96 rounded border-2 bg-gray-50 p-5 shadow-2xl">
			<div className="flex justify-between">
				<h2 id="modal">Modal</h2>
				<button
					className="rounded border bg-gray-100 p-2"
					id="modal-close-button"
					onClick={() => close()}
					type="button"
				>
					close
				</button>
			</div>
			<form action={handleRevalidateSubmit}>
				<button
					className="rounded bg-sky-600 p-2 text-white"
					id="modal-submit-button"
					type="submit"
				>
					Revalidate Submit
				</button>
			</form>
		</div>
	);
}
