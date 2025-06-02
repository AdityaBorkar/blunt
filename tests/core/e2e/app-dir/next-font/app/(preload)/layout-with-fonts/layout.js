import localFont from 'next/font/local';

const layoutFont = localFont({ src: './layout-font-nunito-sans.woff2' });

export default function Layout({ children }) {
	return (
		<>
			<p className={layoutFont.className} id="layout-with-fonts">
				{JSON.stringify(layoutFont)}
			</p>
			{children}
		</>
	);
}
