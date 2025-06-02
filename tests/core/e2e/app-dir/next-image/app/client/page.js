'use client';

import Image from 'next/image';

import testPng from '../../images/test.png';
import Comp from './Comp';

export default function ClientPage() {
	return (
		<>
			<h2>app-client-page</h2>
			<Image id="app-client-page" quality={60} src={testPng} />
			<Comp />
		</>
	);
}
