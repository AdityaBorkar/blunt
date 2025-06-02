import * as actionMod from './actions';

export default function Page() {
	return (
		<div>
			<form>
				<input placeholder="input" type="text" />
				<button formAction={actionMod.sharedServerLayerAction}>submit</button>
			</form>
		</div>
	);
}
