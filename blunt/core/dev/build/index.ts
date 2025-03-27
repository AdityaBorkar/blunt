import TailwindPlugin from 'bun-plugin-tailwind';

export async function BuildWorkspace() {
	const { outputDir } = globalThis.BLUNTJS;
	console.log('BUILDING WORKSPACE: ', outputDir);

	// Performance and Logging
	console.log('⌛ Compiling');
	const start = performance.now();

	// TODO: BUILD AHEAD OF TIME
	const result = await Bun.build({
		entrypoints: ['blunt/core/dev/constants/index.html'], // !
		outdir: outputDir,
		minify: false,
		splitting: false,
		sourcemap: 'linked',
		// banner: "use client"
		// define: {}
		//   define: {
		//     "process.env.NODE_ENV": JSON.stringify("production"),
		//   },
		// env
		// minify: true,
		// splitting: true,
		// bytecode: true,
		target: 'browser',
		publicPath: '/_public/',
		plugins: [TailwindPlugin],
	});
	console.log(result.outputs);

	// Performance and Logging
	const end = performance.now();
	const compileTime = (end - start).toFixed(2);
	console.log(`✅ Compiled in ${compileTime}ms\n`);
}
