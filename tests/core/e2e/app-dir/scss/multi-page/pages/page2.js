import Link from 'next/link';
export default function Page2() {
	return (
		<>
			<div className="blue-text">This text should be blue.</div>
			<br />
			<input id="text-input" key={`${Math.random()}`} type="text" />
			<br />
			<Link href="/page1">Switch page</Link>
		</>
	);
}
