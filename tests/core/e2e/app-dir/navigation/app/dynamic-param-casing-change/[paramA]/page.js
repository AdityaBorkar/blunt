import Link from 'next/link';

export default function Page() {
	return (
		<>
			<Link href="/dynamic-param-casing-change/paramA/paramB">
				/paramA/paramB
			</Link>

			<div>
				<Link href="/dynamic-param-casing-change/paramA/noParam">
					/paramA/noParam
				</Link>
			</div>
		</>
	);
}
