import type { PageConfig } from 'next';

export const config: PageConfig = {
	runtime: 'nodejs',
};

export default function handler(_req, res) {
	res.json({ hello: 'world' });
}
