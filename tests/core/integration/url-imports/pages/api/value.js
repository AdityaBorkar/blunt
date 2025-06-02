import value from 'http://localhost:12345/value4.js';

export default (_req, res) => {
	res.json({ value: value });
};
