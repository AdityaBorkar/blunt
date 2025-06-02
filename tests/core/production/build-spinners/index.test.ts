import path from 'node:path';
import { createNext, type NextInstance } from 'e2e-utils';
import fs from 'fs-extra';
import resolveFrom from 'resolve-from';
import stripAnsi from 'strip-ansi';

type File = {
	filename: string;
	content: string;
};

const appDirFiles: File[] = [
	{
		content: `
    export default function Page() {
      return <p>hello world</p>
    }
  `,
		filename: 'app/page.js',
	},
	{
		content: `
    export default function Layout({ children }) {
      return (
        <html>
          <head />
          <body>{children}</body>
        </html>
      )
    }
  `,
		filename: 'app/layout.js',
	},
];
const pagesFiles: File[] = [
	{
		content: `
    export default function Page() {
      return (
        <p>another page</p>
      )
    }
  `,
		filename: 'pages/another.js',
	},
];

let next: NextInstance;

describe('build-spinners', () => {
	beforeAll(async () => {
		next = await createNext({
			dependencies: {
				'node-pty': '0.10.1',
			},
			files: {},
			packageJson: {
				pnpm: {
					onlyBuiltDependencies: ['node-pty'],
				},
			},
			skipStart: true,
		});
	});

	afterAll(() => next.destroy());

	beforeEach(async () => {
		await fs.remove(path.join(next.testDir, 'pages'));
		await fs.remove(path.join(next.testDir, 'app'));
	});

	it.each([
		{ files: appDirFiles, name: 'app dir - basic' },
		{
			files: [
				...appDirFiles,
				{
					content: `
        module.exports = {
          experimental: {
            webpackBuildWorker: true,
          }
        }
      `,
					filename: 'next.config.js',
				},
			],
			name: 'app dir - (compile workers)',
		},
		{
			files: [
				...pagesFiles,
				{
					content: `
        module.exports = {
          experimental: {
            webpackBuildWorker: true,
          }
        }
      `,
					filename: 'next.config.js',
				},
			],
			name: 'page dir',
		},
		{ files: pagesFiles, name: 'page dir (compile workers)' },
		{ files: [...appDirFiles, ...pagesFiles], name: 'app and pages' },
	])('should handle build spinners correctly $name', async ({ files }) => {
		for (const { filename, content } of files) {
			await next.patchFile(filename, content);
		}

		const appDir = next.testDir;

		const ptyPath = resolveFrom(appDir, 'node-pty');
		const pty = require(ptyPath);
		const output = [];
		const ptyProcess = pty.spawn('pnpm', ['next', 'build'], {
			cols: 80,
			cwd: appDir,
			env: process.env,
			name: 'xterm-color',
			rows: 30,
		});

		ptyProcess.onData((data) => {
			stripAnsi(data)
				.split('\n')
				.forEach((line) => output.push(line));
			process.stdout.write(data);
		});

		await new Promise<void>((resolve, reject) => {
			ptyProcess.onExit(({ exitCode, signal }) => {
				if (exitCode) {
					return reject(`failed with code ${exitCode}`);
				}
				resolve();
			});
		});

		let compiledIdx = -1;
		let optimizedBuildIdx = -1;
		let collectingPageDataIdx = -1;
		let generatingStaticIdx = -1;
		let finalizingOptimization = -1;

		// order matters so we check output from end to start
		for (let i = output.length - 1; i--; i >= 0) {
			const line = output[i];

			if (compiledIdx === -1 && line.includes('Compiled successfully')) {
				compiledIdx = i;
			}

			if (
				optimizedBuildIdx === -1 &&
				line.includes('Creating an optimized production build')
			) {
				optimizedBuildIdx = i;
			}

			if (
				collectingPageDataIdx === -1 &&
				line.includes('Collecting page data')
			) {
				collectingPageDataIdx = i;
			}

			if (
				generatingStaticIdx === -1 &&
				line.includes('Generating static pages')
			) {
				generatingStaticIdx = i;
			}

			if (
				finalizingOptimization === -1 &&
				line.includes('Finalizing page optimization')
			) {
				finalizingOptimization = i;
			}
		}

		expect(compiledIdx).not.toBe(-1);
		expect(optimizedBuildIdx).not.toBe(-1);
		expect(collectingPageDataIdx).not.toBe(-1);
		expect(generatingStaticIdx).not.toBe(-1);
		expect(finalizingOptimization).not.toBe(-1);

		expect(optimizedBuildIdx).toBeLessThan(compiledIdx);
		expect(compiledIdx).toBeLessThan(collectingPageDataIdx);
		expect(collectingPageDataIdx).toBeLessThan(generatingStaticIdx);
		expect(generatingStaticIdx).toBeLessThan(finalizingOptimization);
	});
});
