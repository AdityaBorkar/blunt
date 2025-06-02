import Head from 'next/head';
import React from 'react';

export default function HeadPage() {
	const [shouldReverseScriptOrder, reverseScriptOrder] = React.useReducer(
		(b) => !b,
		false,
	);
	const [shouldInsertScript, toggleScript] = React.useReducer((b) => !b, false);

	const scriptAsyncTrue = <script async src="/test-async-true.js"></script>;
	const scriptAsyncFalse = (
		<script async={false} src="/test-async-false.js"></script>
	);

	return (
		<div>
			<Head>
				{/* this will not render */}
				<meta charSet="utf-8" />
				{/* this will get rendered */}
				<meta charSet="iso-8859-5" />

				{/* this will not render */}
				<meta content="width=device-width" name="viewport" />
				{/* this will override the default */}
				<meta content="width=device-width,initial-scale=1" name="viewport" />

				<meta content="my meta" />

				{/* this will not render the content prop */}
				<meta content={undefined} name="empty-content" />

				{/* allow duplicates for specific tags */}
				<meta content="tag1" key="tag1key" property="article:tag" />
				<meta content="tag2" key="tag2key" property="article:tag" />
				<meta content="tag3" key="same-key" property="dedupe:tag" />
				<meta content="tag4" key="same-key" property="dedupe:tag" />
				<meta content="ogImageTag1" key="ogImageTag1Key" property="og:image" />
				<meta content="ogImageTag2" key="ogImageTag2Key" property="og:image" />
				<meta
					content="ogImageAltTag1"
					key="ogImageAltTag1Key"
					property="og:image:alt"
				/>
				<meta
					content="ogImageAltTag2"
					key="ogImageAltTag2Key"
					property="og:image:alt"
				/>
				<meta
					content="ogImageWidthTag1"
					key="ogImageWidthTag1Key"
					property="og:image:width"
				/>
				<meta
					content="ogImageWidthTag2"
					key="ogImageWidthTag2Key"
					property="og:image:width"
				/>
				<meta
					content="ogImageHeightTag1"
					key="ogImageHeightTag1Key"
					property="og:image:height"
				/>
				<meta
					content="ogImageHeightTag2"
					key="ogImageHeightTag2Key"
					property="og:image:height"
				/>
				<meta
					content="ogImageTypeTag1"
					key="ogImageTypeTag1Key"
					property="og:image:type"
				/>
				<meta
					content="ogImageTypeTag2"
					key="ogImageTypeTag2Key"
					property="og:image:type"
				/>
				<meta
					content="ogImageSecureUrlTag1"
					key="ogImageSecureUrlTag1Key"
					property="og:image:secure_url"
				/>
				<meta
					content="ogImageSecureUrlTag2"
					key="ogImageSecureUrlTag2Key"
					property="og:image:secure_url"
				/>
				<meta
					content="ogImageUrlTag1"
					key="ogImageUrlTag1Key"
					property="og:image:url"
				/>
				<meta
					content="ogImageUrlTag2"
					key="ogImageUrlTag2Key"
					property="og:image:url"
				/>

				<meta content="fbpages1" property="fb:pages" />
				<meta content="fbpages2" property="fb:pages" />

				{/* both meta tags will be rendered since they use unique keys */}
				<meta
					content="authorName1"
					key="citationAuthorTag1"
					name="citation_author"
				/>
				<meta
					content="authorName2"
					key="citationAuthorTag2"
					name="citation_author"
				/>

				<React.Fragment>
					<title>Fragment title</title>
					<meta content="meta fragment" />
				</React.Fragment>

				{/* the following 2 link tags will both be rendered */}
				<link href="/dup-style.css" rel="stylesheet" />
				<link href="/dup-style.css" rel="stylesheet" />

				{/* only one tag will be rendered as they have the same key */}
				<link href="dedupe-style.css" key="my-style" rel="stylesheet" />
				<link href="dedupe-style.css" key="my-style" rel="stylesheet" />

				{shouldInsertScript ? scriptAsyncTrue : null}
				{/* this should not execute twice on the client */}
				{shouldReverseScriptOrder ? scriptAsyncTrue : scriptAsyncFalse}
				{/* this should have async set to false on the client */}
				{shouldReverseScriptOrder ? scriptAsyncFalse : scriptAsyncTrue}
				{/* this should not execute twice on the client (intentionally sets defer to `yas` to test boolean coercion) */}
				<script defer="yas" src="/test-defer.js"></script>

				{/* such style can be used for alternate links on _app vs individual pages */}
				{['pl', 'en'].map((language) => (
					<link
						href={`/first/${language}`}
						hrefLang={language}
						key={language}
						rel="alternate"
					/>
				))}
				{['pl', 'en'].map((language) => (
					<link
						href={`/last/${language}`}
						hrefLang={language}
						key={language}
						rel="alternate"
					/>
				))}
			</Head>
			<h1>I can have meta tags</h1>
			<button id="reverseScriptOrder" onClick={reverseScriptOrder}>
				Reverse script order
			</button>
			<button id="toggleScript" onClick={toggleScript}>
				Toggle script
			</button>
		</div>
	);
}
