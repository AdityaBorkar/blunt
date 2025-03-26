type FileMetadata = {
	type: 'page' | 'layout' | 'middleware' | 'template' | 'route';
	path: string;
};

type Files = {
	[key: string]: FileMetadata;
	match: (path: string) => FileMetadata[];
};

type Routes = {
	[key: string]: FileMetadata[];
	match: (path: string) => FileMetadata[];
};

interface RouterInstance {
	files: Files;
	routes: Routes;
}

export interface BluntGlobalConfig {
	ppr?: boolean; // default: false
	spa?: boolean; // default: false
	ssr: boolean;
	streaming: boolean;
	pages?: {
		include?: string[];
		exclude?: string[];
	};
	timeout?: number; // default: 60
	botDetection?: boolean | (() => boolean);
	maxRequestBodySize?: number;
}

export interface BluntPageConfig {
	ssr?: boolean; // default: false
	ppr?: boolean; // default: false
	streaming?: boolean; // default: false
	spa?: boolean; // default: false
	pages?: {
		include?: string[];
		exclude?: string[];
	};
	timeout?: number; // default: 60
}

export interface BluntRouteConfig {
	ssr?: boolean; // default: false
	ppr?: boolean; // default: false
	spa?: boolean; // default: false
	pages?: {
		include?: string[];
		exclude?: string[];
	};
	timeout?: number; // default: 60
}
