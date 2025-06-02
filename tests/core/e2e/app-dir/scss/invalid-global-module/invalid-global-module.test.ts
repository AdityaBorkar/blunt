/* eslint-env jest */

import { join } from 'node:path';
import { remove } from 'fs-extra';
import { nextBuild } from 'next-test-utils';
// In order for the global isNextStart to be set
import 'e2e-utils';

describe.skip('Invalid CSS Global Module Usage in node_modules', () => {
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
				expect(stderr).toContain('node_modules/example/index.scss');
				expect(stderr).toMatch(
					/Global CSS.*cannot.*be imported from within.*node_modules/,
				);
				expect(stderr).toMatch(
					/Location:.*node_modules[\\/]example[\\/]index\.mjs/,
				);
			});
		},
	);
});
