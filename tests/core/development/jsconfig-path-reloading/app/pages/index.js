import { Button1 } from '@c/button-1';
import { firstData } from '@lib/first-data';
import { Button2 } from '@mybutton';

export default function Page(_props) {
	return (
		<>
			<Button1 />
			<Button2 />
			<p id="first-data">{JSON.stringify(firstData)}</p>
		</>
	);
}
