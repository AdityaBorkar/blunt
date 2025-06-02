// ? We have decided not to support react-server-actions. We understand API routes are better for now.
// ? We strongly recommend using API routes instead. We will revisit this decision in the future.
type FileType = {
	type:
		| 'page'
		| 'layout'
		| 'template'
		| 'loading'
		| 'error'
		| 'route'
		| 'middleware'
		| 'file'
		| 'not-found';
	method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'OPTIONS' | 'HEAD';
	filePath: string;
	httpPath: string;
	dirPath: string;
	relativePath: string;
};

type RouteRecord = {
	GET?: (req: BunRequest, server: Server) => Response | Promise<Response>;
	POST?: (req: BunRequest, server: Server) => Response | Promise<Response>;
	PUT?: (req: BunRequest, server: Server) => Response | Promise<Response>;
	DELETE?: (req: BunRequest, server: Server) => Response | Promise<Response>;
	PATCH?: (req: BunRequest, server: Server) => Response | Promise<Response>;
	OPTIONS?: (req: BunRequest, server: Server) => Response | Promise<Response>;
	HEAD?: (req: BunRequest, server: Server) => Response | Promise<Response>;
};
