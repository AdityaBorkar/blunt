import { type } from 'arktype';

export const FileConfigSchema = type({
	streaming: 'boolean',
	timeout: 'number',
});

export type FileConfig = typeof FileConfigSchema.infer;
