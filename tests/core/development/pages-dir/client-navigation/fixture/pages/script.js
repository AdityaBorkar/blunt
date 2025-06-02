import Script from 'next/script';

export default () => (
	<div>
		<h1>I am a page to test next/script</h1>
		<Script async src="/test-async-true.js" />
		<Script async={false} src="/test-async-false.js" />
		<Script defer src="/test-defer.js" />
	</div>
);
