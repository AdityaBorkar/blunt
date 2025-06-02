import type { MetadataRoute } from 'next';
// eslint-disable-next-line @typescript-eslint/no-unused-expressions
() => {
	({
		background_color: undefined,
		categories: undefined,
		description: undefined,
		dir: undefined,
		display: undefined,
		display_override: undefined,
		file_handlers: undefined,
		icons: undefined,
		id: undefined,
		lang: undefined,
		launch_handler: undefined,
		name: undefined,
		orientation: undefined,
		prefer_related_applications: undefined,
		protocol_handlers: undefined,
		related_applications: undefined,
		scope: undefined,
		screenshots: undefined,
		share_target: undefined,
		short_name: undefined,
		shortcuts: undefined,
		start_url: undefined,
		theme_color: undefined,
	}) satisfies MetadataRoute.Manifest;
	({
		icons: [
			{
				purpose: undefined,
				sizes: undefined,
				src: '',
				type: undefined,
			},
		],
		related_applications: [
			{
				id: undefined,
				platform: '',
				url: '',
			},
		],
		screenshots: [
			{
				form_factor: undefined,
				label: undefined,
				platform: undefined,
				sizes: undefined,
				src: '',
				type: undefined,
			},
		],
		share_target: {
			action: '',
			enctype: undefined,
			method: undefined,
			params: {
				files: undefined,
				text: undefined,
				title: undefined,
				url: undefined,
			},
		},
		shortcuts: [
			{
				description: undefined,
				icons: undefined,
				name: '',
				short_name: undefined,
				url: '',
			},
		],
	}) satisfies MetadataRoute.Manifest;
};
