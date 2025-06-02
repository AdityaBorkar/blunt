import { readFileSync } from 'node:fs';
import { join } from 'node:path';

// __dirname is going to be different after build since the file
// is located in .next/server/pages/api instead of the src location
// so this is not currently expected to work
const file = join(__dirname, '../../static/data/item.txt');
const content = readFileSync(file, 'utf8');
console.log({ content, file });

export default (_req, res) => {
	res.end(content);
};
