import fs from 'node:fs';

const img = new URL('../../public/vercel.png', import.meta.url);

export default (_req, res) => {
	res.json({ size: fs.readFileSync(img).length });
};
