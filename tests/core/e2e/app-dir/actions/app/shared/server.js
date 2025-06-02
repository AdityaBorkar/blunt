import { get, inc } from './action';

export async function Server() {
	const x = await get();
	return (
		<>
			<h2 id="value">Value = {x}</h2>
			<form>
				<button formAction={inc} id="server-inc">
					Inc
				</button>
			</form>
		</>
	);
}
