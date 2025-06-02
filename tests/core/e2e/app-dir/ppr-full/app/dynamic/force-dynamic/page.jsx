import { Suspense } from 'react';

import { Dynamic } from '../../../components/dynamic';

export const dynamic = 'force-dynamic';

export default () => {
	return (
		<Suspense fallback={<Dynamic fallback pathname="/dynamic/force-dynamic" />}>
			<Dynamic pathname="/dynamic/force-dynamic" />
		</Suspense>
	);
};
