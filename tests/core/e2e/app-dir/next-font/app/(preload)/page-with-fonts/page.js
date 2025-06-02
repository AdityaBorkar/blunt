import localFont from 'next/font/local';

const pageFont = localFont({ src: './page-font-raleway-thin.woff2' });

export default function HomePage() {
	return (
		<p className={pageFont.className} id="page-with-fonts">
			{JSON.stringify(pageFont)}
		</p>
	);
}
