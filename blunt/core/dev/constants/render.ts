import fs from 'node:fs';
import path from 'node:path';
import { generateHydrationScript, getAssets } from 'solid-js/web';

const dist = import.meta.resolve('../dist').replace('file://', '');
const serverEntry = await import('../dist/server/entry-server.js');
const template = fs.readFileSync(path.join(dist, 'client/index.html'), 'utf-8');

const routes = ['/'];

for (const route of routes) {
	const { app } = serverEntry.render({ url: route });
	const html = template
		.replace('<!--ssr-outlet-->', app)
		.replace('<!--ssr-head-->', generateHydrationScript())
		.replace('<!--ssr-assets-->', getAssets());
	const filePath = `${dist}/client${route === '/' ? '/index' : route}.html`;
	fs.mkdirSync(path.dirname(filePath), {
		recursive: true,
	});
	fs.writeFileSync(filePath, html);

	console.log(`Pre-rendered: ${filePath}`);
}
