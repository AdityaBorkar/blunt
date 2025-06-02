import { GoogleMapsEmbed } from '@next/third-parties/google';

const Page = () => {
	return (
		<div className="container">
			<h1>Google Maps Embed</h1>
			<GoogleMapsEmbed
				apiKey="XYZ"
				height={200}
				id="maps-embed"
				mode="place"
				q="Brooklyn+Bridge,New+York,NY"
				width="100%"
			/>
		</div>
	);
};

export default Page;
