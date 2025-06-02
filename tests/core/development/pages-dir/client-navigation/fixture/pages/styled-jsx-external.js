import { pBlue } from '../lib/colored-blue';
export default () => (
	<div>
		<p className={pBlue.className} id="blue-box">
			This is blue
		</p>
		{pBlue.styles}
	</div>
);
