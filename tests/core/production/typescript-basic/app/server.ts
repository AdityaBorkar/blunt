import bundleAnalyzer from '@next/bundle-analyzer';
import next from 'next';

// eslint-disable-next-line
const _config = bundleAnalyzer({});

const app = next({
	conf: {
		compress: false,
	},
	dev: process.env.NODE_ENV !== 'production',
	dir: '.',
	quiet: false,
});
// eslint-disable-next-line
const _requestHandler = app.getRequestHandler();
