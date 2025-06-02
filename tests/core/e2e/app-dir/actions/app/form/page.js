import { accountForOverhead } from '../../account-for-overhead';

async function action(formData) {
	'use server';
	const payload = formData.get('payload').toString();
	console.log('size =', payload.length);
}

export default function Page() {
	return (
		<>
			<form action={action}>
				<input
					name="payload"
					type="hidden"
					value={'a'.repeat(accountForOverhead(1))}
				/>
				<button id="size-1mb" type="submit">
					SUBMIT 1mb
				</button>
			</form>
			<form action={action}>
				<input
					name="payload"
					type="hidden"
					value={'a'.repeat(accountForOverhead(2))}
				/>
				<button id="size-2mb" type="submit">
					SUBMIT 2mb
				</button>
			</form>
			<form action={action}>
				<input
					name="payload"
					type="hidden"
					value={'a'.repeat(accountForOverhead(3))}
				/>
				<button id="size-3mb" type="submit">
					SUBMIT 3mb
				</button>
			</form>
		</>
	);
}
