import { font1 } from 'my-font';

export default function HomePage() {
	return (
		<p className={font1.className} id="third-party-page">
			{JSON.stringify(font1)}
		</p>
	);
}
