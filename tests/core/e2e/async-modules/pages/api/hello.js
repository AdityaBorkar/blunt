const value = await Promise.resolve(42);

export default function (_req, res) {
	res.json({ value });
}
