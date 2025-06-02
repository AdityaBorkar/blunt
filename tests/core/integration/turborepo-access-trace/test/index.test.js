/* eslint-env jest */
/* eslint-env jest */

import { join } from 'node:path';
import fs from 'fs-extra';
import { nextBuild } from 'next-test-utils';

const appDir = join(__dirname, '../app');

describe('build with proxy trace', () => {
	(process.env.TURBOPACK_DEV ? describe.skip : describe)(
		'production mode',
		() => {
			it('should build and output trace correctly', async () => {
				const result = await nextBuild(appDir, undefined, {
					cwd: appDir,
					env: {
						SSG_ROUTE_ENV_VAR_HEADER_TEXT: 'Welcome',
						TURBOREPO_TRACE_FILE: '.turbo/turborepo-trace.json',
					},
					stderr: true,
					stdout: true,
				});
				expect(result.code).toBe(0);

				const accessTrace = await fs.readJSON(
					join(appDir, '.turbo', 'turborepo-trace.json'),
				);
				expect(accessTrace.outputs).toStrictEqual([
					'dist/**',
					'!dist/cache/**',
				]);
				expect(accessTrace.accessed.envVarKeys).toBeArray();
				expect(accessTrace.accessed.envVarKeys).toContain(
					'SSG_ROUTE_ENV_VAR_HEADER_TEXT',
				);
				expect(accessTrace.accessed.network).toBeFalse();
				expect(accessTrace.accessed.filePaths).toBeArray();
			});
		},
	);
});
