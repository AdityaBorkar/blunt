/* eslint-env jest */

import { join } from 'node:path';
import { readFile } from 'fs-extra';
import {
	getImageEtag,
	getPreviouslyCachedImageOrNull,
} from 'next/dist/server/image-optimizer';
import {
	CachedRouteKind,
	type IncrementalCacheEntry,
} from 'next/dist/server/response-cache/types';

const getImageUpstream = async (filepath, contentType = 'image/jpeg') => {
	const buffer = await readFile(join(__dirname, filepath));
	const result: Parameters<typeof getPreviouslyCachedImageOrNull>[0] = {
		buffer,
		cacheControl: 'max-age=31536000',
		contentType,
		etag: getImageEtag(buffer),
	};
	return result;
};
const baseCacheEntry = {
	curRevalidate: Date.now() + 500,
	isFallback: false,
	isMiss: false,

	isStale: false,
	revalidate: Date.now() + 1000,
	revalidateAfter: Date.now() + 1000,
} as const;

const getPreviousCacheEntry = async (
	filepath,
	extension = 'jpeg',
	optimizedEtag = true,
) => {
	const buffer = await readFile(join(__dirname, filepath));
	const upstreamEtag = getImageEtag(buffer);
	const result: IncrementalCacheEntry = {
		...baseCacheEntry,
		value: {
			buffer,
			etag: optimizedEtag ? 'optimized-etag' : upstreamEtag,
			extension,
			kind: CachedRouteKind.IMAGE,
			upstreamEtag,
		},
	};
	return result;
};

describe('shouldUsePreviouslyCachedEntry', () => {
	it('should return the cached image if the upstream image matches previous cache entry upstream etag and not the optimized etag', async () => {
		const previousEntry = await getPreviousCacheEntry('./images/test.jpg');
		expect(
			getPreviouslyCachedImageOrNull(
				await getImageUpstream('./images/test.jpg'),
				previousEntry,
			),
		).toEqual(previousEntry.value);
	});

	it('should return null if previous cache entry value is not of kind IMAGE', async () => {
		const nonImageCacheEntry: IncrementalCacheEntry = {
			...baseCacheEntry,
			value: { kind: CachedRouteKind.REDIRECT, props: {} },
		};
		expect(
			getPreviouslyCachedImageOrNull(
				await getImageUpstream('./images/test.jpg'),
				nonImageCacheEntry,
			),
		).toBe(null);
	});

	it('should return null if upstream image does not match previous cache entry upstream etag', async () => {
		expect(
			getPreviouslyCachedImageOrNull(
				await getImageUpstream('./images/test.png', 'image/png'),
				await getPreviousCacheEntry('./images/test.jpg'),
			),
		).toBe(null);
	});

	it('should return null if upstream image matches optimized etag', async () => {
		expect(
			getPreviouslyCachedImageOrNull(
				await getImageUpstream('./images/test.jpg'),
				await getPreviousCacheEntry('./images/test.jpg', 'jpeg', false),
			),
		).toBe(null);
	});

	it('should return null if previous cache entry is undefined', async () => {
		expect(
			getPreviouslyCachedImageOrNull(
				await getImageUpstream('./images/test.jpg'),
				undefined,
			),
		).toBe(null);
	});

	it('should return null if previous cache entry is null', async () => {
		expect(
			getPreviouslyCachedImageOrNull(
				await getImageUpstream('./images/test.jpg'),
				null,
			),
		).toBe(null);
	});

	it('should return null if previous cache entry value is null', async () => {
		const nullValueCacheEntry = { ...baseCacheEntry, value: null };
		expect(
			getPreviouslyCachedImageOrNull(
				await getImageUpstream('./images/test.jpg'),
				nullValueCacheEntry,
			),
		).toBe(null);
	});
});
