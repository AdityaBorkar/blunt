import { Deferred, sleep } from './sleep';

export function Streamable(write: number) {
	const encoder = new TextEncoder();
	const canceled = new Deferred();
	const aborted = new Deferred();
	let i = 0;

	const streamable = {
		abort() {
			aborted.resolve();
		},
		finished: Promise.any([canceled.promise, aborted.promise]).then(() => i),
		stream: new ReadableStream({
			cancel() {
				canceled.resolve();
			},
			async pull(controller) {
				if (i >= write) {
					return;
				}

				await sleep(100);
				controller.enqueue(encoder.encode(String(i++)));
			},
		}),
	};
	return streamable;
}
