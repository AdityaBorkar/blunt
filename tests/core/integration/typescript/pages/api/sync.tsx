import type { NextApiHandler } from 'next';

const SyncApiEndpoint: NextApiHandler = (_req, res) => {
	res.status(200).json({ code: 'ok' });
};

export default SyncApiEndpoint;
