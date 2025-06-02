'use client';

import { useRouter } from 'next/navigation';

export function Search() {
	const router = useRouter();

	function search(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();

		const input = event.currentTarget.q.value;
		const params = new URLSearchParams([['q', input]]);
		router.push(`/search?${params}`);
	}

	return (
		<form onSubmit={search}>
			<input className="border" name="q" placeholder="Search..." />
			<button>Submit</button>
		</form>
	);
}
