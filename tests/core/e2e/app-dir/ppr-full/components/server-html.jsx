'use client';

import { useServerInsertedHTML } from 'next/navigation';
import { useRef } from 'react';

export function ServerHtml() {
	const ref = useRef(0);
	useServerInsertedHTML(() => (
		<meta content={ref.current++} name="server-html" />
	));
}
