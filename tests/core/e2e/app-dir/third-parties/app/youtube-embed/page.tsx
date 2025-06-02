import { YouTubeEmbed } from '@next/third-parties/google';

const Page = () => {
	return (
		<div className="container">
			<h1>Youtube Embed</h1>
			<YouTubeEmbed height={400} videoid="ogfYd705cRs" />
		</div>
	);
};

export default Page;
