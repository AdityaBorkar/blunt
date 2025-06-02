import type { NextConfig } from 'next';

// type error
const foo: number = 'foo';

const nextConfig: NextConfig = {
	env: {
		foo,
	},
};

export default nextConfig;
