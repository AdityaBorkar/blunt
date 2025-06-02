import Image from 'next/image';
import Link from 'next/link';

import testImage from '../public/test.jpg';
import styles from './styles.module.css';

export default function Page() {
	return (
		<>
			<p className={styles.template}>hello pages</p>
			<p id="deploymentId">{process.env.NEXT_DEPLOYMENT_ID}</p>
			<Image alt="test image" src={testImage} />
			<Link href="/pages-edge" id="edge-link">
				Edge
			</Link>

			<button
				id="dynamic-import"
				onClick={() => {
					import('../data').then((mod) => {
						console.log('loaded data', mod);
					});
				}}
			>
				click me
			</button>
		</>
	);
}
