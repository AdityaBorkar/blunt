import { Suspense } from 'react';

import { Dynamic } from '../components/dynamic';

export default () => {
	return (
		<Suspense fallback={<Dynamic fallback pathname="/" />}>
			<Dynamic pathname="/" />
		</Suspense>
	);
};
