import { redText } from './index.module.scss';

function Home() {
	return (
		<>
			<div className={redText} id="verify-red">
				This text should be red.
			</div>
			<br />
			<input id="text-input" key={`${Math.random()}`} type="text" />
		</>
	);
}

export default Home;
