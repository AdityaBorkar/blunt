export default async function handler(req, res) {
	try {
		await res.revalidate(req.query.path);
		return res.json({ now: Date.now(), revalidated: true });
	} catch (err) {
		console.error('Failed to revalidate', req.query, err);
		return res.json({ revalidated: false });
	}
}
