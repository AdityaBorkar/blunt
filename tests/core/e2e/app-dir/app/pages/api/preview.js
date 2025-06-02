export default function handler(_req, res) {
	res.setPreviewData({ key: 'value' });
	res.status(200).end();
}
