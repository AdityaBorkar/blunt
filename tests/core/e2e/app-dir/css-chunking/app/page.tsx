import Link from 'next/link';

import InnerWrapper from '../components/inner-wrapper';
import styles from './page.module.css';

export default function Home() {
	return (
		<div className={styles.page}>
			<InnerWrapper>
				<h1 className={styles.h1}>Home Page</h1>
				<Link href="./other" prefetch={false}>
					Other page
				</Link>
			</InnerWrapper>
		</div>
	);
}
