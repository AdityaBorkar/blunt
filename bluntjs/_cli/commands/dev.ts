import { serve } from '../utils/serve';

/**
 * Development server command
 */
export async function devCommand(options: { port?: string; host?: string }) {
	process.env.NODE_ENV = 'development';
	const port = options.port ? parseInt(options.port) : 3000;
	const host = options.host ?? 'localhost';
	await serve({ host, port });
}
