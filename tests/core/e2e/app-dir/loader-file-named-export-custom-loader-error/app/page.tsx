import Image from 'next/image';

export default function Page() {
	return (
		<p>
			<Image alt="logo" height="400" id="logo" src="/logo.png" width="400" />
		</p>
	);
}
