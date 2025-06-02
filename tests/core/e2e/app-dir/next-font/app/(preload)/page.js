import { font1, font2 } from '../../fonts';
import Comp from './Comp';

export default function HomePage() {
	return (
		<>
			<p className={font1.className}>Hello world</p>
			<p className={font2.className} id="root-page">
				{JSON.stringify(font2)}
			</p>
			<Comp />
		</>
	);
}

export const runtime = 'edge';
