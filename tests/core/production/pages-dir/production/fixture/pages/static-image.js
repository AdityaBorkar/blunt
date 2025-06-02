import Image from 'next/image';

import logo from '../public/vercel.png';

export default () => (
	<div>
		<p>Static Image</p>
		<Image id="static-image" placeholder="blur" src={logo} />
	</div>
);
