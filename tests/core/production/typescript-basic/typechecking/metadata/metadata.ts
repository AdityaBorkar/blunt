import type { Metadata } from 'next';
import type { ResolvedMetadata } from 'next/types';
// eslint-disable-next-line @typescript-eslint/no-unused-expressions
() => {
	({
		abstract: undefined,
		alternates: undefined,
		appLinks: undefined,
		'apple-touch-fullscreen': undefined,
		'apple-touch-icon-precomposed': undefined,
		appleWebApp: undefined,
		applicationName: undefined,
		archives: undefined,
		assets: undefined,
		authors: undefined,
		bookmarks: undefined,
		category: undefined,
		classification: undefined,
		colorScheme: undefined,
		creator: undefined,
		description: undefined,
		facebook: undefined,
		formatDetection: undefined,
		generator: undefined,
		icons: undefined,
		itunes: undefined,
		keywords: undefined,
		manifest: undefined,
		metadataBase: undefined,
		openGraph: undefined,
		other: undefined,
		publisher: undefined,
		referrer: undefined,
		robots: undefined,
		themeColor: undefined,
		title: undefined,
		twitter: undefined,
		verification: undefined,
		viewport: undefined,
	}) satisfies Metadata;
	({
		alternates: {
			canonical: undefined,
			languages: undefined,
			media: undefined,
			types: undefined,
		},
		authors: {
			name: undefined,
			url: undefined,
		},
		formatDetection: {
			address: undefined,
			date: undefined,
			email: undefined,
			telephone: undefined,
			url: undefined,
		},
		icons: {
			apple: undefined,
			icon: undefined,
			other: {
				color: undefined,
				fetchPriority: undefined,
				media: undefined,
				rel: undefined,
				sizes: undefined,
				type: undefined,
				url: '',
			},
			shortcut: undefined,
		},
		itunes: {
			appArgument: undefined,
			appId: '',
		},
		robots: {
			follow: undefined,
			googleBot: undefined,

			index: undefined,
			indexifembedded: undefined,
			'max-image-preview': undefined,
			'max-snippet': undefined,
			'max-video-preview': undefined,

			noarchive: undefined,
			nocache: undefined,
			nofollow: undefined,
			noimageindex: undefined,

			noindex: undefined,
			nositelinkssearchbox: undefined,
			nosnippet: undefined,
			notranslate: undefined,
			unavailable_after: undefined,
		},
		themeColor: {
			color: '',
			media: undefined,
		},
		verification: {
			google: undefined,
			me: undefined,
			other: undefined,
			yahoo: undefined,
			yandex: undefined,
		},
		viewport: {
			height: undefined,
			initialScale: undefined,
			interactiveWidget: undefined,
			maximumScale: undefined,
			minimumScale: undefined,
			userScalable: undefined,
			viewportFit: undefined,
			width: undefined,
		},
	}) satisfies Metadata;
	({
		canonical: {
			title: undefined,
			url: '',
		},
	}) satisfies Metadata['alternates'];
	({
		alternateLocale: undefined,
		audio: undefined,
		countryName: undefined,
		description: undefined,
		determiner: undefined,
		emails: undefined,
		faxNumbers: undefined,
		images: undefined,
		locale: undefined,
		phoneNumbers: undefined,
		siteName: undefined,
		title: undefined,
		ttl: undefined,
		type: 'website',
		url: undefined,
		videos: undefined,
	}) satisfies Metadata['openGraph'];
	({
		audio: {
			secureUrl: undefined,
			type: undefined,
			url: '',
		},
		images: {
			alt: undefined,
			height: undefined,
			secureUrl: undefined,
			type: undefined,
			url: '',
			width: undefined,
		},
		videos: {
			height: undefined,
			secureUrl: undefined,
			type: undefined,
			url: '',
			width: undefined,
		},
	}) satisfies Metadata['openGraph'];
	({
		authors: undefined,
		expirationTime: undefined,
		modifiedTime: undefined,
		publishedTime: undefined,
		section: undefined,
		tags: undefined,
		type: 'article',
	}) satisfies Metadata['openGraph'];
	({
		authors: undefined,
		isbn: undefined,
		releaseDate: undefined,
		tags: undefined,
		type: 'book',
	}) satisfies Metadata['openGraph'];
	({
		firstName: undefined,
		gender: undefined,
		lastName: undefined,
		type: 'profile',
		username: undefined,
	}) satisfies Metadata['openGraph'];
	({
		albums: undefined,
		duration: undefined,
		musicians: undefined,
		type: 'music.song',
	}) satisfies Metadata['openGraph'];
	({
		albums: {
			disc: undefined,
			track: undefined,
			url: '',
		},
		type: 'music.song',
	}) satisfies Metadata['openGraph'];
	({
		musicians: undefined,
		releaseDate: undefined,
		songs: undefined,
		type: 'music.album',
	}) satisfies Metadata['openGraph'];
	({
		songs: {
			disc: undefined,
			track: undefined,
			url: '',
		},
		type: 'music.album',
	}) satisfies Metadata['openGraph'];
	({
		creators: undefined,
		songs: undefined,
		type: 'music.playlist',
	}) satisfies Metadata['openGraph'];
	({
		creators: undefined,
		type: 'music.radio_station',
	}) satisfies Metadata['openGraph'];
	({
		actors: undefined,
		directors: undefined,
		duration: undefined,
		releaseDate: undefined,
		tags: undefined,
		type: 'video.movie',
		writers: undefined,
	}) satisfies Metadata['openGraph'];
	({
		actors: {
			role: undefined,
			url: '',
		},
		type: 'video.movie',
	}) satisfies Metadata['openGraph'];
	({
		actors: undefined,
		directors: undefined,
		duration: undefined,
		releaseDate: undefined,
		series: undefined,
		tags: undefined,
		type: 'video.episode',
		writers: undefined,
	}) satisfies Metadata['openGraph'];
	({
		app: {
			id: {},
			name: undefined,
			url: undefined,
		},
		card: 'app',
		creator: undefined,
		creatorId: undefined,
		description: undefined,
		images: undefined,
		site: undefined,
		siteId: undefined,
		title: undefined,
	}) satisfies Metadata['twitter'];
	({
		app: {
			id: {
				googleplay: undefined,
				ipad: undefined,
				iphone: undefined,
			},
			url: {
				googleplay: undefined,
				ipad: undefined,
				iphone: undefined,
			},
		},
		card: 'app',
		images: {
			alt: undefined,
			height: undefined,
			secureUrl: undefined,
			type: undefined,
			url: '',
			width: undefined,
		},
	}) satisfies Metadata['twitter'];
	({
		admins: undefined,
		appId: '',
	}) satisfies Metadata['facebook'];
	({
		admins: '',
		appId: undefined,
	}) satisfies Metadata['facebook'];
	({
		capable: undefined,
		startupImage: undefined,
		statusBarStyle: undefined,
		title: undefined,
	}) satisfies Metadata['appleWebApp'];
	({
		startupImage: {
			media: undefined,
			url: '',
		},
	}) satisfies Metadata['appleWebApp'];
	({
		android: undefined,
		ios: undefined,
		ipad: undefined,
		iphone: undefined,
		web: undefined,
		windows: undefined,
		windows_phone: undefined,
		windows_universal: undefined,
	}) satisfies Metadata['appLinks'];
	({
		android: {
			app_name: undefined,
			class: undefined,
			package: '',
			url: undefined,
		},
		ios: {
			app_name: undefined,
			app_store_id: undefined,
			url: '',
		},
		web: {
			should_fallback: undefined,
			url: '',
		},
		windows_phone: {
			app_id: undefined,
			app_name: undefined,
			url: '',
		},
	}) satisfies Metadata['appLinks'];
	({
		apple: [],
		icon: [],
		other: undefined,
		shortcut: undefined,
	}) satisfies ResolvedMetadata['icons'];
	({
		alternateLocale: undefined,
		audio: undefined,
		countryName: undefined,
		description: undefined,
		determiner: undefined,
		emails: undefined,
		faxNumbers: undefined,
		images: undefined,
		locale: undefined,
		phoneNumbers: undefined,
		siteName: undefined,
		title: { absolute: '', template: null },
		ttl: undefined,
		url: null,
		videos: undefined,
	}) satisfies ResolvedMetadata['openGraph'];
	({
		authors: undefined,
		expirationTime: undefined,
		modifiedTime: undefined,
		publishedTime: undefined,
		section: undefined,
		tags: undefined,
		title: { absolute: '', template: null },
		type: 'article',
		url: null,
	}) satisfies ResolvedMetadata['openGraph'];
	({
		authors: undefined,
		isbn: undefined,
		releaseDate: undefined,
		tags: undefined,
		title: { absolute: '', template: null },
		type: 'book',
		url: null,
	}) satisfies ResolvedMetadata['openGraph'];
	({
		title: { absolute: '', template: null },
		type: 'book',
		url: null,
	}) satisfies ResolvedMetadata['openGraph'];
	({
		firstName: undefined,
		gender: undefined,
		lastName: undefined,
		title: { absolute: '', template: null },
		type: 'profile',
		url: null,
		username: undefined,
	}) satisfies ResolvedMetadata['openGraph'];
	({
		albums: undefined,
		duration: undefined,
		musicians: undefined,
		title: { absolute: '', template: null },
		type: 'music.song',
		url: null,
	}) satisfies ResolvedMetadata['openGraph'];
	({
		musicians: undefined,
		releaseDate: undefined,
		songs: undefined,
		title: { absolute: '', template: null },
		type: 'music.album',
		url: null,
	}) satisfies ResolvedMetadata['openGraph'];
	({
		creators: undefined,
		songs: undefined,
		title: { absolute: '', template: null },
		type: 'music.playlist',
		url: null,
	}) satisfies ResolvedMetadata['openGraph'];
	({
		creators: undefined,
		title: { absolute: '', template: null },
		type: 'music.radio_station',
		url: null,
	}) satisfies ResolvedMetadata['openGraph'];
	({
		actors: undefined,
		directors: undefined,
		duration: undefined,
		releaseDate: undefined,
		tags: undefined,
		title: { absolute: '', template: null },
		type: 'video.movie',
		url: null,
		writers: undefined,
	}) satisfies ResolvedMetadata['openGraph'];
	({
		actors: undefined,
		directors: undefined,
		duration: undefined,
		releaseDate: undefined,
		series: undefined,
		tags: undefined,
		title: { absolute: '', template: null },
		type: 'video.episode',
		url: null,
		writers: undefined,
	}) satisfies ResolvedMetadata['openGraph'];
	({
		card: 'summary',
		creator: null,
		creatorId: null,
		description: null,
		images: undefined,
		site: null,
		siteId: null,
		title: { absolute: '', template: null },
	}) satisfies ResolvedMetadata['twitter'];
	({
		card: 'summary',
		creator: null,
		creatorId: null,
		description: null,
		images: [
			{
				alt: undefined,
				height: undefined,
				secureUrl: undefined,
				type: undefined,
				url: '',
				width: undefined,
			},
		],
		site: null,
		siteId: null,
		title: { absolute: '', template: null },
	}) satisfies ResolvedMetadata['twitter'];
	({
		admins: undefined,
		appId: undefined,
	}) satisfies ResolvedMetadata['facebook'];
	({
		google: undefined,
		me: undefined,
		other: undefined,
		yahoo: undefined,
		yandex: undefined,
	}) satisfies ResolvedMetadata['verification'];
	({
		capable: false,
		startupImage: undefined,
		statusBarStyle: undefined,
		title: undefined,
	}) satisfies ResolvedMetadata['appleWebApp'];
	({
		android: undefined,
		ios: undefined,
		ipad: undefined,
		iphone: undefined,
		web: undefined,
		windows: undefined,
		windows_phone: undefined,
		windows_universal: undefined,
	}) satisfies ResolvedMetadata['appLinks'];
};
