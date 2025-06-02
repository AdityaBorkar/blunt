import type { NextConfig } from 'next';

import { cjs } from './fixtures/cjs.cjs';
import { commonjs } from './fixtures/commonjs';
import { cts } from './fixtures/cts.cts';
import { mjs } from './fixtures/mjs.mjs';
import { mts } from './fixtures/mts.mts';
import { ts } from './fixtures/ts';

const nextConfig: NextConfig = {
	env: {
		cjs,
		commonjs,
		cts,
		mjs,
		mts,
		ts,
	},
};

export default nextConfig;
