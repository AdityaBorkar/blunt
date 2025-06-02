/* eslint-env jest */

import { join } from 'node:path';
import { readFile } from 'fs-extra';
import { getBlurImage } from 'next/dist/build/webpack/loaders/next-image-loader/blur';

const getImage = (filepath) => readFile(join(__dirname, filepath));

const tracing = () => ({
	traceAsyncFn: (fn, ...args) => fn(...args),
	traceFn: (fn, ...args) => fn(...args),
});

const context = { basePath: '', isDev: false, outputPath: '', tracing };

describe('getBlurImage', () => {
	it('should return image for jpg', async () => {
		const buffer = await getImage('./images/test.jpg');
		const result = await getBlurImage(
			buffer,
			'jpeg',
			{ height: 400, width: 400 },
			context,
		);
		expect(result).toBeObject();
		expect(result.dataURL).toBeString();
	});
	it('should return undefined for animated webp', async () => {
		const buffer = await getImage('./images/animated.webp');
		const result = await getBlurImage(
			buffer,
			'webp',
			{ height: 400, width: 400 },
			context,
		);
		expect(result).toBeObject();
		expect(result.dataURL).toBeUndefined();
	});
});
