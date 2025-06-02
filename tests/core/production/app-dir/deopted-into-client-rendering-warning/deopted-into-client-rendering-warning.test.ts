import { nextBuild } from 'next-test-utils';

it('should not show deopted into client rendering warning', async () => {
	const output = await nextBuild(__dirname, undefined, {
		stderr: true,
		stdout: true,
	});
	expect(output.code).toBe(0);
	expect(output.stderr).not.toContain(
		`Entire page / deopted into client-side rendering.`,
	);
});
