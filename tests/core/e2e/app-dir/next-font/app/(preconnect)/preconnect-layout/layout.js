import localFont from 'next/font/local';

const layoutFont = localFont({
	preload: false,
	src: './layout-font-rubik.woff2',
});

export default function Layout({ children }) {
	return (
		<>
			<p className={layoutFont.className}>{JSON.stringify(layoutFont)}</p>
			{children}
		</>
	);
}
