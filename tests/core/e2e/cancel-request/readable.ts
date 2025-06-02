import * as stream from 'node:stream';

import { Deferred, sleep } from './sleep';

export function Readable(write: number) {
	const encoder = new TextEncoder();
	const cleanedUp = new Deferred();
	const aborted = new Deferred();
	let i = 0;

	const readable = {
		abort() {
			aborted.resolve();
		},
		finished: Promise.all([cleanedUp.promise, aborted.promise]).then(() => i),
		stream: new stream.Readable({
			destroy() {
				cleanedUp.resolve();
			},
			async read() {
				if (i >= write) {
					return;
				}

				await sleep(100);
				this.push(encoder.encode(String(i++)));
			},
		}),
	};
	return readable;
}
