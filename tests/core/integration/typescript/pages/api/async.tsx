import type { NextApiHandler } from 'next';

const AsyncApiEndpoint: NextApiHandler = async (_req, res) => {
	res.status(200).json({ code: 'ok' });
};

export default AsyncApiEndpoint;
