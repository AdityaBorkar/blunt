import Link from 'next/link';

export default function Home() {
	return (
		<div className="mx-auto flex h-screen w-60 flex-col justify-center gap-4 text-center">
			<p>Nested parallel routes demo.</p>
			<p id="page-now">Date.now {Date.now()}</p>
			<div className="flex flex-col gap-2">
				<Link
					className="rounded bg-sky-600 p-2 text-white"
					href="/nested-revalidate/drawer"
				>
					Open Drawer
				</Link>
				<Link
					className="rounded bg-sky-600 p-2 text-white"
					href="/nested-revalidate/modal"
				>
					Open Modal
				</Link>
			</div>
		</div>
	);
}
