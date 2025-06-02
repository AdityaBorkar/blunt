const { cjsModuleTypeAction } = require('./actions');

export default function Page() {
	return (
		<div>
			<h3>One</h3>
			<form>
				<input placeholder="input" type="text" />
				<button formAction={cjsModuleTypeAction}>submit</button>
			</form>
		</div>
	);
}
