import { type } from 'arktype';

export const PageConfigSchema = type({
	ppr: 'boolean',
	spa: 'boolean',
	ssr: 'boolean',
	streaming: 'boolean',
	timeout: 'number',
});

export type PageConfig = typeof PageConfigSchema.infer;
