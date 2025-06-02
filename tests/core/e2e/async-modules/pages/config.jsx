import Head from 'next/head';

export const config = {
	amp: true,
};

await Promise.resolve('tadaa');

export default function Config() {
	const date = new Date();
	return (
		<div>
			<Head>
				<script
					async
					custom-element="amp-timeago"
					key="amp-timeago"
					src="https://cdn.ampproject.org/v0/amp-timeago-0.1.js"
				/>
			</Head>
			<amp-timeago
				datetime={date.toJSON()}
				height="15"
				id="amp-timeago"
				layout="responsive"
				width="0"
			>
				fail
			</amp-timeago>
		</div>
	);
}
