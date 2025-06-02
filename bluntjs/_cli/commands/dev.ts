import { serve } from '../utils/serve';

/**
 * Development server command
 */
export async function devCommand(options: {
	port?: string;
	host?: string;
	https?: boolean;
}) {
	process.env.NODE_ENV = 'development';
	await serve(options);
}
