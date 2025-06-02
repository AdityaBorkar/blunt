import fs from 'node:fs';
import path from 'node:path';

export function getData() {
	return JSON.parse(
		fs.readFileSync(path.join(process.cwd(), 'content/hello.json'), 'utf8'),
	);
}
