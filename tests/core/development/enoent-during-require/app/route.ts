import fs from 'node:fs';

fs.readFileSync('does-not-exist.txt');

export default function handler() {
	return null;
}
