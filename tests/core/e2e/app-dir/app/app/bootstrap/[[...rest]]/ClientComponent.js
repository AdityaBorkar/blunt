'use client';

import { useEffect, useState } from 'react';

export function ClientComponent() {
	const [val, setVal] = useState('initial');
	useEffect(() => {
		setVal('[[updated]]');
	}, []);
	return <span id="val">{val}</span>;
}
