import { setTimeout } from 'node:timers/promises';
import type { MetadataRoute } from 'next';

import { getSentinelValue } from './sentinel';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	'use cache';

	// Simulate I/O
	await setTimeout(100);

	return [{ url: `https://acme.com?sentinel=${getSentinelValue()}` }];
}
