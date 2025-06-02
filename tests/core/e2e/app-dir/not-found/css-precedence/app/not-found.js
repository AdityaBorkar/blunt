'use client';

import { useRouter } from 'next/navigation';

import { Button } from '../components/button/button';

function NotFound() {
	const router = useRouter();
	return (
		<div>
			<h1>404 - Page Not Found</h1>
			<Button
				id="go-to-index"
				onClick={() => {
					router.push('/');
				}}
			>
				Home
			</Button>
		</div>
	);
}

export default NotFound;
