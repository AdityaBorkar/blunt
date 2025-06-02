import Link from 'next/link';
export default function Page1() {
	return (
		<>
			<div className="red-text">This text should be red.</div>
			<br />
			<input id="text-input" key={`${Math.random()}`} type="text" />
			<br />
			<Link href="/page2">Switch page</Link>
		</>
	);
}
