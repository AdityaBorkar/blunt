import dec, { slowInc } from './actions';
import { log } from './actions-2';
import { inc } from './actions-3';
import ClientForm from './client-form';
import Counter from './counter';
import Form from './form';

export default function Page() {
	const two = { value: 2 };

	// https://github.com/vercel/next.js/issues/58463
	const data = '你好';

	return (
		<>
			<Counter
				dec={dec}
				double={async (x) => {
					'use server';
					if (data === '你好') {
						return x * two.value;
					}
					// Wrong answer
					return 42;
				}}
				inc={inc}
				slowInc={slowInc}
			/>
			<Form />
			<ClientForm />
			<form>
				<button formAction={log} id="log">
					log
				</button>
			</form>
		</>
	);
}
