import { createNext, type NextInstance } from 'e2e-utils';

describe('ES Check .next output', () => {
	let next: NextInstance;
	afterEach(() => next.destroy());

	it('should emit ES2020 with default', async () => {
		next = await createNext({
			buildCommand: 'pnpm build',
			dependencies: { 'es-check': '7.0.1' },
			files: {
				'pages/index.js': 'export default function Page() { return "hi" }',
			},
			installCommand: 'pnpm i',
			packageJson: {
				scripts: {
					build: 'next build && es-check es2020 .next/static/**/*.js',
				},
			},
		});
		expect(next.cliOutput).toContain(
			'info: ES-Check: there were no ES version matching errors!  🎉',
		);
	});
});
