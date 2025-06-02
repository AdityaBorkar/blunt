import { Logger } from 'blunt/_logger';
import { getProjectConfig } from 'blunt/server/config/project-config';

/**
 * Build command for production
 */
export async function buildCommand(options: {
	outDir?: string;
	analyze?: boolean;
}) {
	const environment = process.env.NODE_ENV ?? 'production';
	process.env.NODE_ENV = environment;

	const { config, path } = await getProjectConfig().catch(() => {
		Logger.error(
			'Could not detect a Blunt project.',
			'Create a `blunt.config.ts` file OR run `bunx create-blunt-app`',
		);
		process.exit(1);
	});

	Logger.info('Building...');
	Logger.info(`Using environment: ${environment}`);
	Logger.info(`Using config: ${path}`);

	const _config = { ...config, ...options };
	// 	const outDir = options.outDir || config.build.outDir || '.build';

	// 	const startTime = performance.now();

	// 	// Clean output directory
	// 	if (existsSync(outDir)) {
	// 		Logger.info('Cleaning output directory...');
	// 		await Bun.spawn(['rm', '-rf', outDir]).exited;
	// 	}

	// 	await mkdir(outDir, { recursive: true });

	// 	// Copy public assets
	// 	if (existsSync(config.app.publicDir)) {
	// 		Logger.info('Copying public assets...');
	// 		await cp(config.app.publicDir, join(outDir, 'public'), {
	// 			recursive: true,
	// 		});
	// 	}

	// 	// Build the application
	// 	Logger.info('Bundling application...');

	// 	const result = await Bun.build({
	// 		entrypoints: [join(config.app.dir, 'layout.tsx')],
	// 		outdir: outDir,
	// 		minify: config.build.minify,
	// 		sourcemap: config.build.sourcemap ? 'external' : 'none',
	// 		target: 'bun',
	// 		splitting: true,
	// 	});

	// 	if (!result.success) {
	// 		Logger.error('Build failed:');
	// 		for (const log of result.logs) {
	// 			console.error(log);
	// 		}
	// 		process.exit(1);
	// 	}

	// 	const endTime = performance.now();
	// 	const buildTime = ((endTime - startTime) / 1000).toFixed(2);

	// 	Logger.success(`Build completed in ${buildTime}s`);
	// 	Logger.info(`Output directory: ${outDir}`);

	// 	if (options.analyze) {
	// 		Logger.info('Bundle analysis:');
	// 		for (const output of result.outputs) {
	// 			const size = (output.size / 1024).toFixed(2);
	// 			Logger.info(`  ${output.path} - ${size}KB`);
	// 		}
	// 	}
}
