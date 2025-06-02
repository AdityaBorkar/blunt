import { join } from 'node:path';
import { createNext, FileRef, type NextInstance } from 'e2e-utils';
import { assertHasRedbox, getRedboxSource } from 'next-test-utils';
import webdriver from 'next-webdriver';

describe('font-loader-in-document-error', () => {
	let next: NextInstance;

	beforeAll(async () => {
		next = await createNext({
			files: {
				pages: new FileRef(join(__dirname, 'font-loader-in-document/pages')),
			},
		});
	});
	afterAll(() => next.destroy());

	test('next/font inside _document', async () => {
		const browser = await webdriver(next.url, '/');
		await assertHasRedbox(browser);
		if (process.env.TURBOPACK) {
			// TODO: Turbopack doesn't include pages/
			expect(await getRedboxSource(browser)).toMatchInlineSnapshot(`
        "./_document.js
        next/font: error:
        Cannot be used within _document.js"
      `);
		} else {
			expect(await getRedboxSource(browser)).toMatchInlineSnapshot(`
              "pages/_document.js
              \`next/font\` error:
              Cannot be used within pages/_document.js."
          `);
		}
	});
});
