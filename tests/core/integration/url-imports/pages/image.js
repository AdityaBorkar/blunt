import logo from 'https://github.com/vercel/next.js/raw/canary/test/integration/url/public/vercel.png?_=image';

import Image from 'next/image';

export default () => (
	<div>
		<Image id="static-image" placeholder="blur" src={logo} />
	</div>
);
