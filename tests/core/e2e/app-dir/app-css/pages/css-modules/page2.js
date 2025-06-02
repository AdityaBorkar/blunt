import Link from 'next/link';

import classes from './page2.module.css';
import './page2.css';

export default function Page() {
	return (
		<>
			<h1 className={classes.box} id="page2">
				Page 2
			</h1>
			<div className="page-2">
				<Link href="/css-modules/page1">Page 1</Link>
			</div>
		</>
	);
}
