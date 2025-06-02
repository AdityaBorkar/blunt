import type { NextConfig } from 'next';

import { cjs } from './fixtures/cjs.cjs';
import { cts } from './fixtures/cts.cts';
import { esm } from './fixtures/esm';
import { mjs } from './fixtures/mjs.mjs';
import { mts } from './fixtures/mts.mts';
import { ts } from './fixtures/ts';

const nextConfig: NextConfig = {
	env: {
		cjs,
		cts,
		esm,
		mjs,
		mts,
		ts,
	},
};

export default nextConfig;
