/* eslint-env jest */

import { join } from 'node:path';
import cheerio from 'cheerio';
import { findPort, killApp, launchApp, renderViaHTTP } from 'next-test-utils';

const appDir = join(__dirname, '..');
let appPort;
let app;

async function get$(path, query) {
	const html = await renderViaHTTP(appPort, path, query);
	return cheerio.load(html);
}

describe('TypeScript Features', () => {
	describe('default behavior', () => {
		beforeAll(async () => {
			appPort = await findPort();
			app = await launchApp(appDir, appPort, {});
		});
		afterAll(() => killApp(app));

		it('should render the page with external TS/TSX dependencies', async () => {
			const $ = await get$('/');
			expect($('body').text()).toMatch(/Hello World!Counter: 0/);
		});
	});
});
