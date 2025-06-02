import { foo } from './index.module.scss';

export default function Home() {
	return (
		<div className={foo} id="verify-div">
			<div className="bar">Bar</div>
			<div className="baz">Baz</div>
			<div className="lol">Lol</div>
			<div className="lel">Lel</div>
		</div>
	);
}
