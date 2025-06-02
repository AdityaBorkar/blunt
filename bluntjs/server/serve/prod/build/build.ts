#!/usr/bin/env bun

import { existsSync } from 'node:fs';
import { rm } from 'node:fs/promises';
import path from 'node:path';
import { build } from 'bun';
import plugin from 'bun-plugin-tailwind';

console.log('\n🚀 Building React frontend...\n');

const outdir = path.join(process.cwd(), 'dist');

// Clean previous build
if (existsSync(outdir)) {
	console.log('🗑️ Cleaning previous build...');
	await rm(outdir, { force: true, recursive: true });
}

const start = performance.now();

try {
	// Build the React frontend
	const result = await build({
		define: {
			'process.env.NODE_ENV': JSON.stringify('production'),
		},
		entrypoints: ['src/frontend.html'],
		minify: false,
		outdir,
		plugins: [plugin],
		sourcemap: 'linked',
		target: 'browser',
	});

	const end = performance.now();
	const buildTime = (end - start).toFixed(2);

	if (result.success) {
		console.log('✅ Build completed successfully!');

		// Show build output
		if (result.outputs.length > 0) {
			console.table(
				result.outputs.map((output) => ({
					File: path.relative(process.cwd(), output.path),
					Size: formatBytes(output.size),
				})),
			);
		}

		console.log(`⏱️ Build time: ${buildTime}ms\n`);
	} else {
		console.error('❌ Build failed!');
		if (result.logs) {
			console.error(result.logs);
		}
		process.exit(1);
	}
} catch (error) {
	console.error('❌ Build error:', error);
	process.exit(1);
}

function formatBytes(bytes: number): string {
	const units = ['B', 'KB', 'MB', 'GB'];
	let size = bytes;
	let unitIndex = 0;

	while (size >= 1024 && unitIndex < units.length - 1) {
		size /= 1024;
		unitIndex++;
	}

	return `${size.toFixed(2)} ${units[unitIndex]}`;
}
