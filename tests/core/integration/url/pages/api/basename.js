import path from 'node:path';

const img = new URL('../../public/vercel.png', import.meta.url);

export default (_req, res) => {
	res.json({ basename: path.posix.basename(img.pathname) });
};
