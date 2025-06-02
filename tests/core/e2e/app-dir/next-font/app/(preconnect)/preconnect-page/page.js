'use client';

import localFont from 'next/font/local';

const pageFont = localFont({
	preload: false,
	src: './page-font-ubuntu-regular.woff2',
});

export default function Page() {
	return (
		<>
			<p className={pageFont.className}>{JSON.stringify(pageFont)}</p>
		</>
	);
}
