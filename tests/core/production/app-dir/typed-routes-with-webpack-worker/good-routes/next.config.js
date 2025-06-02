/** @type {import('next').NextConfig} */
module.exports = {
	experimental: {
		parallelServerBuildTraces: true,
		typedRoutes: true,
		webpackBuildWorker: true,
	},
};
