import { type } from 'arktype';

export const RouteConfigSchema = type({
	ppr: 'boolean',
	spa: 'boolean',
	ssr: 'boolean',
	streaming: 'boolean',
	timeout: 'number',
});

export type RouteConfig = typeof RouteConfigSchema.infer;
