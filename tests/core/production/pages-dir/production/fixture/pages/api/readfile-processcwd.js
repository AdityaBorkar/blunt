import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const file = join(process.cwd(), 'static/data/item.txt');
const content = readFileSync(file, 'utf8');
console.log({ content, file });

export default (_req, res) => {
	res.end(content);
};
