/** @type {import('next').NextConfig} */
const nextConfig = {
	rewrites() {
		return {
			fallback: [
				{
					destination: '/api/app-redirect/:path*',
					// This rewrites all other paths to the appDir to check if they're teamSlugs. Otherwise it will 404.
					source: '/:path*',
				},
			],
		};
	},
};

module.exports = nextConfig;
