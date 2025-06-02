import Link from 'next/link';

export default function Home() {
	return (
		<>
			<div>
				<Link className="text-blue-500" href={`/nested`}>
					nested Page
				</Link>
			</div>
			<h1>This is the Home Page</h1>
		</>
	);
}
