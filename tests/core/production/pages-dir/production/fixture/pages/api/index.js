import fs from 'node:fs';
import path from 'node:path';

import css from '../../components/logo/logo.module.css';

export default (_req, res) => {
	console.log({
		fsLoadedData: fs.readFileSync(
			path.join(process.cwd(), 'components', 'logo', 'logo.module.css'),
			'utf8',
		),
		importedData: css,
	});
	res.end('API index works');
};
