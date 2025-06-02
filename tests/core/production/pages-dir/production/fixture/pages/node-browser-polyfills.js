import { Buffer } from 'node:buffer';
import crypto from 'node:crypto';
import path from 'node:path';
import { Writable } from 'node:stream';
import vm from 'node:vm';
import { useEffect, useState } from 'react';

export default function NodeBrowserPolyfillPage() {
	const [state, setState] = useState({});
	useEffect(() => {
		let closedStream = false;

		const writable = new Writable({
			write(_chunk, _encoding, callback) {
				callback();
			},
		});

		writable.on('finish', () => {
			closedStream = true;
		});

		writable.end();

		setState({
			buffer: Buffer.from('hello world').toString('utf8'),
			hash: crypto.createHash('sha256').update('hello world').digest('hex'),
			path: path.join('/hello/world', 'test.txt'),
			stream: closedStream,
			vm: vm.runInNewContext('a + 5', { a: 100 }),
		});
	}, []);

	useEffect(() => {
		if (state.vm) {
			window.didRender = true;
		}
	}, [state]);

	return (
		<>
			<div
				dangerouslySetInnerHTML={{ __html: JSON.stringify(state) }}
				id="node-browser-polyfills"
			></div>
		</>
	);
}
