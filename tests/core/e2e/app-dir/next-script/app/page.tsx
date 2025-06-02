import Script from 'next/script';

export default function Page() {
	return (
		<Script
			crossOrigin="use-credentials"
			src="https://code.jquery.com/jquery-3.7.1.min.js"
		/>
	);
}
