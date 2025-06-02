import { Suspense } from 'react';

import { Dynamic } from '../../../components/dynamic';

export const dynamic = 'force-static';
export const revalidate = 120;

export default () => {
	return (
		<Suspense fallback={<Dynamic fallback pathname="/dynamic/force-static" />}>
			<Dynamic pathname="/dynamic/force-static" />
		</Suspense>
	);
};
