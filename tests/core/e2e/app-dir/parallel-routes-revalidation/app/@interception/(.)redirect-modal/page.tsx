import { redirectAction } from '../../actions';
import { RedirectForm } from '../../components/RedirectForm';

export default function Page() {
	return (
		<dialog open>
			<h1>Modal</h1>

			<br />

			<RedirectForm action={redirectAction} />
		</dialog>
	);
}
