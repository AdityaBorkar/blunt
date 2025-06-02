'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Start() {
	const [href, setHref] = useState('');
	return (
		<form>
			<input
				name="href"
				onChange={(e) => setHref(e.target.value)}
				type="text"
				value={href}
			/>
			{href === '' ? null : <Link href={href}>Navigate</Link>}
		</form>
	);
}
