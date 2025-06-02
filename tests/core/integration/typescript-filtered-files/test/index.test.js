/* eslint-env jest */

import { join } from 'node:path';
import { nextBuild } from 'next-test-utils';

const appDir = join(__dirname, '..');
describe('TypeScript filtered files', () => {
	(process.env.TURBOPACK_DEV ? describe.skip : describe)(
		'production mode',
		() => {
			it('should fail to build the app with a file named con*test*.js', async () => {
				const output = await nextBuild(appDir, [], {
					stderr: true,
					stdout: true,
				});
				expect(output.stdout).not.toMatch(/Compiled successfully/);
				expect(output.code).toBe(1);
				expect(output.stderr).toMatch(/Failed to compile/);
				expect(output.stderr).toMatch(/is not assignable to type 'boolean'/);
			});
		},
	);
});
