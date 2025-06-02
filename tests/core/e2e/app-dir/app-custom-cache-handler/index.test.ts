import fs from 'node:fs';
import { FileRef, type NextInstance, nextTestSetup } from 'e2e-utils';
import { check } from 'next-test-utils';

const originalNextConfig = fs.readFileSync(
	`${__dirname}/next.config.js`,
	'utf8',
);

function runTests(
	exportType: string,
	{ next, isNextDev }: { next: NextInstance; isNextDev: boolean },
) {
	describe(exportType, () => {
		it('should have logs from cache-handler', async () => {
			if (isNextDev) {
				await next.fetch('/');
			}
			await check(() => {
				expect(next.cliOutput).toContain(`cache handler - ${exportType}`);
				expect(next.cliOutput).toContain('initialized custom cache-handler');
				expect(next.cliOutput).toContain('cache-handler get');
				expect(next.cliOutput).toContain('cache-handler set');
				return 'success';
			}, 'success');
		});
	});
}

describe('app-dir - custom-cache-handler - cjs', () => {
	const { next, isNextDev, skipped } = nextTestSetup({
		env: {
			CUSTOM_CACHE_HANDLER: 'cache-handler.js',
		},
		files: __dirname,
		skipDeployment: true,
	});

	if (skipped) {
		return;
	}

	runTests('cjs module exports', { isNextDev, next });
});

describe('app-dir - custom-cache-handler - cjs-default-export', () => {
	const { next, isNextDev, skipped } = nextTestSetup({
		env: {
			CUSTOM_CACHE_HANDLER: 'cache-handler-cjs-default-export.js',
		},
		files: __dirname,
		skipDeployment: true,
	});

	if (skipped) {
		return;
	}

	runTests('cjs default export', { isNextDev, next });
});

describe('app-dir - custom-cache-handler - esm', () => {
	const { next, isNextDev, skipped } = nextTestSetup({
		env: {
			CUSTOM_CACHE_HANDLER: 'cache-handler-esm.js',
		},
		files: {
			app: new FileRef(`${__dirname}/app`),
			'cache-handler-esm.js': new FileRef(`${__dirname}/cache-handler-esm.js`),
			'next.config.js': originalNextConfig.replace(
				'module.exports = ',
				'export default ',
			),
		},
		packageJson: {
			type: 'module',
		},
		skipDeployment: true,
	});

	if (skipped) {
		return;
	}

	runTests('esm default export', { isNextDev, next });
});
