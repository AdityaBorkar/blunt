import { setTimeout } from 'node:timers/promises';
import type { MetadataRoute } from 'next';

import { getSentinelValue } from './sentinel';

export default async function robots(): Promise<MetadataRoute.Robots> {
	'use cache';

	// Simulate I/O
	await setTimeout(100);

	return {
		rules: { allow: `/${getSentinelValue()}`, userAgent: '*' },
	};
}
