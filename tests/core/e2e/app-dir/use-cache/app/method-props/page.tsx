import { createCached } from './cached';
import { Form } from './form';

export default function Page() {
	const cached1 = createCached(1);
	const cached2 = createCached(2);

	return (
		<main>
			<Form getRandomValue={cached1.getRandomValue} id="form-1" />
			<Form getRandomValue={cached2.getRandomValue} id="form-2" />
		</main>
	);
}
