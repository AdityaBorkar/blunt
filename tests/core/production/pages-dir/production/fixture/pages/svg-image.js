import Image from 'next/image';

const Page = () => {
	return (
		<div>
			<h1>SVG with a script tag attempting XSS</h1>
			<Image height="100" id="img" src="/xss.svg" width="100" />
			<a href="/_next/image?url=%2Fxss.svg&w=256&q=75" id="btn">
				Click Me
			</a>
			<p id="msg">safe</p>
		</div>
	);
};

export default Page;
