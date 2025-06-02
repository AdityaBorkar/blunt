import dec from '../actions';
import { inc } from '../actions-3';
import Counter from '../counter';
import Form from '../form';

export default function Page() {
	const two = 2;
	return (
		<>
			<Counter
				dec={dec}
				double={async (x) => {
					'use server';
					return x * two;
				}}
				inc={inc}
			/>
			<Form />
		</>
	);
}

export const runtime = 'edge';
