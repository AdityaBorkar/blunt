import Link from 'next/link';

import styles from './styles.module.css';

export default async function Page({
	params,
}: {
	params: Promise<{ num: string }>;
}) {
	const { num } = await params;
	return (
		<div>
			{new Array(100).fill(0).map((_, i) => (
				<div
					key={i}
					style={{
						background: 'pink',
						height: 100,
						margin: 10,
						width: 100,
					}}
				>
					<Link href={`/${Number(num) - 1}`} id="lower">
						lower
					</Link>
					<div>{num}</div>
					<Link href={`/${Number(num) + 1}`} id="higher">
						higher
					</Link>
				</div>
			))}
			<div className={styles.square} />
		</div>
	);
}
