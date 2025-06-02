import fs from 'node:fs';
import path from 'node:path';

const getCmsData = require('some-cms');

try {
	fs.readdirSync(path.join(process.cwd(), 'public/exclude-me'));
} catch (_) {}

export function fetchData() {
	return getCmsData();
}
