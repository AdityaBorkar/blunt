export default function Page() {
	return 'app links';
}

export const metadata = {
	appLinks: {
		android: {
			app_name: 'app_name_android',
			package: 'com.example.android/package',
		},
		ios: {
			app_store_id: 'app_store_id',
			url: 'https://example.com/ios',
		},
		web: {
			should_fallback: true,
			url: 'https://example.com/web',
		},
	},
};
