export type { PageConfig } from '../server/config/page-config';
export type { ProjectConfig } from '../server/config/project-config';
export type { RouteConfig } from '../server/config/route-config';

export type RequestMethod =
	| 'GET'
	| 'POST'
	| 'PUT'
	| 'DELETE'
	| 'PATCH'
	| 'OPTIONS'
	| 'HEAD';

export type FileType = {
	type:
		| 'page'
		| 'layout'
		| 'template'
		| 'loading'
		| 'error'
		| 'route'
		| 'middleware'
		| 'file'
		| 'not-found'
		| 'rewrite'
		| 'redirect';
	method: RequestMethod;
	filePath: string;
	httpPath: string;
	dirPath: string;
	name: string;
	// Optional rewrite/redirect properties
	rewrite?: string;
	redirect?: string;
	code?: number;
};

// ? We have decided not to support react-server-actions. We understand API routes are better for now.
// ? We strongly recommend using API routes instead. We will revisit this decision in the future.
// type FileType = {
// 	type:
// 		| 'page'
// 		| 'layout'
// 		| 'template'
// 		| 'loading'
// 		| 'error'
// 		| 'route'
// 		| 'middleware'
// 		| 'file'
// 		| 'not-found';
// 	method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'OPTIONS' | 'HEAD';
// 	filePath: string;
// 	httpPath: string;
// 	dirPath: string;
// 	relativePath: string;
// };

// type RouteRecord = {
// 	GET?: (req: BunRequest, server: Server) => Response | Promise<Response>;
// 	POST?: (req: BunRequest, server: Server) => Response | Promise<Response>;
// 	PUT?: (req: BunRequest, server: Server) => Response | Promise<Response>;
// 	DELETE?: (req: BunRequest, server: Server) => Response | Promise<Response>;
// 	PATCH?: (req: BunRequest, server: Server) => Response | Promise<Response>;
// 	OPTIONS?: (req: BunRequest, server: Server) => Response | Promise<Response>;
// 	HEAD?: (req: BunRequest, server: Server) => Response | Promise<Response>;
// };

// type FileMetadata = {
// 	type: 'page' | 'layout' | 'middleware' | 'template' | 'route';
// 	path: string;
// };

// type Files = {
// 	[key: string]: FileMetadata;
// 	match: (path: string) => FileMetadata[];
// };

// type Routes = {
// 	[key: string]: FileMetadata[];
// 	match: (path: string) => FileMetadata[];
// };

// interface RouterInstance {
// 	files: Files;
// 	routes: Routes;
// }
