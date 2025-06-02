'use client';

import { useRouter } from 'next/navigation';

export default function Button() {
	const router = useRouter();
	const onClick = () => router.push('/');
	return <button onClick={onClick}>My Button</button>;
}
