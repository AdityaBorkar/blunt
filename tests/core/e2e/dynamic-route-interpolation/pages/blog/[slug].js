import Link from 'next/link';
import { useRouter } from 'next/router';

export function getServerSideProps({ params }) {
	return { props: { now: Date.now(), slug: params.slug } };
}

export default function Page(props) {
	const router = useRouter();
	return (
		<>
			<p id="slug">{props.slug}</p>
			<Link href={router.asPath} id="now">
				{props.now}
			</Link>
		</>
	);
}
