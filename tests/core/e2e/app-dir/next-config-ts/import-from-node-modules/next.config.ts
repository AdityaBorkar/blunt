import { foo } from 'foo';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	env: {
		foo,
	},
};

export default nextConfig;
