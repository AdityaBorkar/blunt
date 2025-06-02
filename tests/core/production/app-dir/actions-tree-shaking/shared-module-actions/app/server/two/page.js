import { sharedServerLayerAction } from '../actions';

export default function Page() {
	return (
		<div>
			<h3>One</h3>
			<form>
				<input placeholder="input" type="text" />
				<button formAction={sharedServerLayerAction}>submit</button>
			</form>
		</div>
	);
}
