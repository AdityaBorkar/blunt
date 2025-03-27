import type { Server } from "bun";
import { file } from "bun";
import { botDetection } from "../utils/botDetection";
import { CompilePage } from "./page";
import { CompileRoute } from "./route";

export async function handleFetch(req: Request, server: Server) {
	const { GLOBAL_CONFIG, router, outputDir } = globalThis.BLUNTJS;

	// Request Processing
	const url = new URL(req.url);
	const path = url.pathname; // .replaceAll('/_public/', '');
	const ip = server.requestIP(req);
	const isCrawler =
		GLOBAL_CONFIG.botDetection === false
			? undefined
			: typeof GLOBAL_CONFIG.botDetection === "function"
				? GLOBAL_CONFIG.botDetection()
				: botDetection();
	const request = { req, ip, isCrawler, path };

	// Implement framework-specific routes
	const paths = path.split("/");
	if (paths[1] === "_public") {
		return new Response(
			file(`${outputDir}/${path.replaceAll("_public/", "")}`),
		);
	}
	if (paths[1] === "_actions") {
	}
	if (paths[1] === "_middleware") {
	}
	if (paths[1] === "_assets") {
	}

	// TODO: Instrumentation

	// Checks:
	const files = router.routes.match(path);
	const PAGE_FILES = files.filter((file) => file.type === "page");
	const ROUTE_FILES = files.filter((file) => file.type === "route");
	const type = PAGE_FILES.length === 1 ? "page" : "route";
	if (!PAGE_FILES.length && !ROUTE_FILES.length) {
		console.log("❌ No Page or Route Found", path);
		return new Response("Not Found", { status: 404 });
	}
	if (PAGE_FILES.length > 1 || ROUTE_FILES.length > 1) {
		console.log("❌ Multiple Pages or Routes Found", path);
		return new Response("Not Found", { status: 404 });
	}
	if (PAGE_FILES.length === 1 && ROUTE_FILES.length === 1) {
		console.log("❌ Both Page and Route Found", path);
		return new Response("Not Found", { status: 404 });
	}
	if (type === "page") return CompilePage({ request, server, files });
	if (type === "route") return CompileRoute({ request, server, files });

	return new Response("Not Found", { status: 404 });
}
