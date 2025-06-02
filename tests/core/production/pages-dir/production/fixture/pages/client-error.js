import Error from 'next/error';
import Link from 'next/link';

// prevent static generation for build trace test
export function getServerSideProps() {
	return {
		props: {},
	};
}

export default function Page(_props) {
	return (
		<>
			<Error title="something went wrong (on purpose)" />
			<Link href="/">to home</Link>
		</>
	);
}
