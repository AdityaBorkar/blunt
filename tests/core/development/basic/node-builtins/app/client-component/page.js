'use client';

import assert from 'node:assert';
import { Buffer } from 'node:buffer';
import constants from 'node:constants';
import crypto from 'node:crypto';
import domain from 'node:domain';
import http from 'node:http';
import https from 'node:https';
import os from 'node:os';
import path from 'node:path';
import process from 'node:process';
import punycode from 'node:punycode';
import querystring from 'node:querystring';
import { Writable } from 'node:stream';
import stringDecoder from 'node:string_decoder';
import sys from 'node:sys';
import timers from 'node:timers';
import tty from 'node:tty';
import util from 'node:util';
import vm from 'node:vm';
import zlib from 'node:zlib';
import { useEffect, useState } from 'react';
import 'setimmediate';

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

		assert.ok(true);

		assert.ok(!!domain);
		assert.ok(!!http);
		assert.ok(!!https);
		assert.ok(!!punycode);
		assert.ok(!!stringDecoder);
		assert.ok(!!sys.debuglog);
		assert.ok(!!timers.setInterval);
		assert.ok(!!tty.ReadStream);
		assert.ok(!!util.inspect);
		assert.ok(!!zlib.Gzip);

		setImmediate(() => {
			setState({
				assert: true,
				buffer: Buffer.from('hello world').toString('utf8'),
				constants: constants.E2BIG,
				domain: true,
				hash: crypto.createHash('sha256').update('hello world').digest('hex'),
				http: true,
				https: true,
				os: os.EOL,
				path: path.join('/hello/world', 'test.txt'),
				process: process.title,
				querystring: querystring.stringify({ a: 'b' }),
				stream: closedStream,
				stringDecoder: true,
				sys: true,
				timers: true,
				tty: true,
				util: true,
				vm: vm.runInNewContext('a + 5', { a: 100 }),
				zlib: true,
			});
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
