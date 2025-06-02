import dynamic from 'next/dynamic';
import Link from 'next/link';

const DynamicComponent = dynamic(() => import('../components/hello'));

export default () => (
	<div id="dynamic-imports-page">
		<div>
			<Link href="/">Go Back</Link>
		</div>
		<DynamicComponent />
	</div>
);
