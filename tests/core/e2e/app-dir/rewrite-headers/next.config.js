/** @type {import('next').NextConfig} */
module.exports = {
	rewrites: async () => {
		return [
			{
				destination: '/hello/samantha',
				source: '/hello/sam',
			},
			{
				destination: '/other',
				source: '/hello/other',
			},
			{
				destination: '/other?key=value',
				source: '/hello/fred',
			},
			{
				destination: 'https://www.google.$1/',
				source: '/hello/(.*)/google',
			},
		];
	},
};
