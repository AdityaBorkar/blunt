import { font3 } from '../../fonts';

export default function Component() {
	return (
		<p className={font3.className} id="root-comp">
			{JSON.stringify(font3)}
		</p>
	);
}
