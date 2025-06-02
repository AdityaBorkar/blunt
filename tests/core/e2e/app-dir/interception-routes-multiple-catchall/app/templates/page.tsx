import Link from 'next/link';

function Page() {
	return (
		<div>
			Simple Page
			<Link href={'/showcase/new'}>showcase/new</Link>
		</div>
	);
}

export default Page;
