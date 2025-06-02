import { Components } from './components';
import { Components as Components2 } from './components-ext';
import { useHooks } from './hooks';
import { useHooks as useHooks2 } from './hooks-ext';

export default function Page() {
	useHooks();
	useHooks2();

	return (
		<>
			<div id="without-ext">
				<Components />
			</div>
			<div id="with-ext">
				<Components2 />
			</div>
		</>
	);
}
