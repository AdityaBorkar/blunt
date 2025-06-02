import localFont from 'next/font/local';

const componentFont = localFont({
	preload: false,
	src: './comp-font-merriweather.woff2',
});

export default function Component() {
	return (
		<p className={componentFont.className}>{JSON.stringify(componentFont)}</p>
	);
}
