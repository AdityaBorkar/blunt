import { sharedServerLayerAction } from './reexport-action';

export default function Page() {
	return (
		<div>
			<form>
				<input placeholder="input" type="text" />
				<button formAction={sharedServerLayerAction}>submit</button>
			</form>
		</div>
	);
}
