import { redirect } from 'next/navigation';
import { Suspense } from 'react';

import { Dynamic } from '../../../../components/dynamic';

const Redirect = () => {
	redirect('/navigation/redirect/location');
};

export default function RedirectPage() {
	return (
		<>
			<Suspense
				fallback={<Dynamic fallback pathname="/navigation/redirect/dynamic" />}
			>
				<Dynamic pathname="/navigation/redirect/dynamic" />
			</Suspense>
			<Redirect />
		</>
	);
}
