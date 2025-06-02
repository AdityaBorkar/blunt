import { serverComponentAction } from '../actions';

export default function Page() {
	return (
		<form>
			<input placeholder="input" type="text" />
			<button formAction={serverComponentAction}>submit</button>
		</form>
	);
}
