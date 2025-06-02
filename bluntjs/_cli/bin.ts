#!/usr/bin/env bun

import { Command } from 'commander';

import { buildCommand } from './commands/build';
import { devCommand } from './commands/dev';
import { ejectCommand } from './commands/eject';
import { startCommand } from './commands/start';

cli();

export function cli() {
	const program = new Command();

	program.name('blunt').version('1.0.0'); // TODO: Use `package.json` version

	program
		.command('dev')
		.description('Start the development server with hot reloading')
		.option('-p, --port <port>', 'port to run the server on', '3000')
		.option('-H, --host <host>', 'hostname to bind the server to', 'localhost')
		.option('--https', 'enable HTTPS with auto-generated certificates', true)
		.action(devCommand);

	program
		.command('start')
		.description('Start the production server')
		.option('-p, --port <port>', 'port to run the server on', '3000')
		.option('-H, --host <host>', 'hostname to bind the server to', 'localhost')
		.option('--https', 'enable HTTPS with auto-generated certificates', true)
		.action(startCommand);

	program
		.command('build')
		.description('Build the application for production')
		.option('-o, --outDir <dir>', 'output directory for the build', '.build')
		.option('--analyze', 'analyze the bundle size', true)
		.action(buildCommand);

	// program
	// 	.command('deploy')
	// 	.description('Deploy the application to a cloud provider')
	// 	.action(deployCommand);

	program
		.command('eject')
		.description('Eject configuration files (irreversible)')
		.option(
			'-f, --force',
			'force eject even if `src/blunt.server(.ts|.js)` exists',
		)
		.action(ejectCommand);

	program.parse();
}
