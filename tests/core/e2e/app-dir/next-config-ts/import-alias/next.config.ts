import { bar } from 'bar';
import type { NextConfig } from 'next';

import { foo } from '@/foo';

const nextConfig: NextConfig = {
	env: {
		bar,
		foo,
	},
};

export default nextConfig;
