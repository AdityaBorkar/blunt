import Script from 'next/script';

import Client from './client';

export default function Page() {
	return (
		<div>
			<h2>next/script</h2>
			<Client />
			<Script src="/test4.js" strategy="lazyOnload" />
			<Script
				src="/test3.js"
				strategy="afterInteractive"
				stylesheets={['/style3.css']}
			/>
			<Script
				src="/test1.js"
				strategy="beforeInteractive"
				stylesheets={['/style1a.css', '/style1b.css']}
			/>
			<Script id="1.5" strategy="beforeInteractive">{`
        ;(window._script_order = window._script_order || []).push(1.5)
        console.log(window._script_order)
      `}</Script>
			<Script src="/test2.js" strategy="beforeInteractive" />
			<Script
				dangerouslySetInnerHTML={{
					__html: `
        ;(window._script_order = window._script_order || []).push(2.5)
        console.log(window._script_order)
        `,
				}}
				id="2.5"
				strategy="beforeInteractive"
			/>
			<Script
				data-extra-prop="script-with-src"
				id="script-with-src-noop-test"
				src="/noop-test.js"
				strategy="beforeInteractive"
			/>
			<Script
				dangerouslySetInnerHTML={{
					__html: `
        console.log('noop-test-dangerouslySetInnerHTML')
        `,
				}}
				data-extra-prop="script-without-src"
				id="script-without-src-noop-test-dangerouslySetInnerHTML"
				strategy="beforeInteractive"
			/>
		</div>
	);
}
