import { MyLink } from 'my-dep';
import { MyContainer } from 'my-dep2';

import Nav from '../nav';
import styles from './page.module.css';

export default function Page() {
	return (
		<div>
			<MyContainer className={styles.my_container}>
				<MyLink className={styles.my_button} id="vendor1">
					hello world
				</MyLink>
			</MyContainer>
			<Nav />
		</div>
	);
}
