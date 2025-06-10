import { type } from 'arktype';

export const PageConfigSchema = type({
	botDetection: 'boolean | Function',
	edge: 'boolean',
	ppr: 'boolean',
	prerender: 'boolean',
	spa: 'boolean',
	ssr: 'boolean',
	streaming: 'boolean',
	timeout: 'number',
});

export type PageConfig = typeof PageConfigSchema.infer;
