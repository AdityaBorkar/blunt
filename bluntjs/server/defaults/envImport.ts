export function importEnvFiles({ env }: { env: string }) {
	if (!['development', 'production', 'test', 'staging'].includes(env))
		throw new Error(`Invalid environment: ${env}`);

	const envFiles = [`.env.${env}`, `.env.${env}.local`];
	return envFiles;
}
