import { subClass } from './index.module.scss';

export default function Home() {
	return (
		<div className={subClass} id="verify-yellow">
			This text should be yellow on blue.
		</div>
	);
}
