const http = require('node:http');
const server = http.createServer((req, res) => {
	console.log('got request', req.url);
	res.end(req.url);
});
const port = process.env.PORT || 3000;

server.listen(port, () => {
	console.log(`Ready on http://localhost:${port}`);
});
