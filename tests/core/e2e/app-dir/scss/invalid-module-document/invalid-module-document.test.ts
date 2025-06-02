/* eslint-env jest */

import { join } from 'node:path';
import { remove } from 'fs-extra';
import { nextBuild } from 'next-test-utils';
// In order for the global isNextStart to be set
import 'e2e-utils';

// TODO: Implement warning for Turbopack

(process.env.TURBOPACK ? describe.skip : describe)(
	'Invalid SCSS in _document',
	() => {
		((global as any).isNextStart ? describe : describe.skip)(
			'production only',
			() => {
				const appDir = __dirname;

				beforeAll(async () => {
					await remove(join(appDir, '.next'));
				});

				it('should fail to build', async () => {
					const { code, stderr } = await nextBuild(appDir, [], {
						stderr: true,
					});
					expect(code).not.toBe(0);
					expect(stderr).toContain('Failed to compile');
					expect(stderr).toContain('styles.module.scss');
					expect(stderr).toMatch(
						/CSS.*cannot.*be imported within.*pages[\\/]_document\.js/,
					);
					expect(stderr).toMatch(/Location:.*pages[\\/]_document\.js/);
				});
			},
		);
	},
);
