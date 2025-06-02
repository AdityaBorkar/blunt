import Script from 'next/script';

import { ShowScriptOrder } from './show-order';

export default function Page() {
	return (
		<>
			<p>script-nonce</p>
			<Script src="/test1.js" strategy="afterInteractive" />
			<Script src="/test2.js" strategy="beforeInteractive" />
			<Script id="3" strategy="beforeInteractive" />
			<ShowScriptOrder />
		</>
	);
}
