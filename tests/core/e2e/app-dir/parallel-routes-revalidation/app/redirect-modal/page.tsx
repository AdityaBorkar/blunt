import { redirectAction } from '../actions';
import { RedirectForm } from '../components/RedirectForm';

export default function Page() {
	return (
		<div>
			<h1>Page</h1>

			<br />

			<RedirectForm action={redirectAction} />
		</div>
	);
}
