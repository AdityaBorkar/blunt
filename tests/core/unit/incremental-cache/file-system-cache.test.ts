import { promises as fs } from 'node:fs';
import { fileURLToPath } from 'node:url';
import FileSystemCache from 'next/dist/server/lib/incremental-cache/file-system-cache';
import { nodeFs } from 'next/dist/server/lib/node-fs-methods';
import {
	CachedRouteKind,
	IncrementalCacheKind,
} from 'next/dist/server/response-cache';

const cacheDir = fileURLToPath(new URL('./cache', import.meta.url));

describe('FileSystemCache', () => {
	it('set image route', async () => {
		const fsCache = new FileSystemCache({
			_requestHeaders: {},
			flushToDisk: true,
			fs: nodeFs,
			revalidatedTags: [],
			serverDistDir: cacheDir,
		});

		const binary = await fs.readFile(
			fileURLToPath(new URL('./images/icon.png', import.meta.url)),
		);

		await fsCache.set(
			'icon.png',
			{
				body: binary,
				headers: {
					'Content-Type': 'image/png',
				},
				kind: CachedRouteKind.APP_ROUTE,
				status: 200,
			},
			{},
		);

		expect(
			(
				await fsCache.get('icon.png', {
					isFallback: undefined,
					kind: IncrementalCacheKind.APP_ROUTE,
				})
			)?.value,
		).toEqual({
			body: binary,
			headers: {
				'Content-Type': 'image/png',
			},
			kind: IncrementalCacheKind.APP_ROUTE,
			status: 200,
		});
	});
});

describe('FileSystemCache (isrMemory 0)', () => {
	const fsCache = new FileSystemCache({
		_requestHeaders: {},
		flushToDisk: true,
		fs: nodeFs,
		maxMemoryCacheSize: 0,
		revalidatedTags: [],
		serverDistDir: cacheDir, // disable memory cache
	});

	it('should cache fetch', async () => {
		await fsCache.set(
			'fetch-cache',
			{
				data: {
					body: 'MTcwMDA1NjM4MQ==',
					headers: {},
					status: 200,
					url: 'http://my-api.local',
				},
				kind: CachedRouteKind.FETCH,
				revalidate: 30,
			},
			{
				fetchCache: true,
				fetchIdx: 5,
				fetchUrl: 'http://my-api.local',
				tags: ['server-time'],
			},
		);

		const res = await fsCache.get('fetch-cache', {
			kind: IncrementalCacheKind.FETCH,
			tags: ['server-time'],
		});

		expect(res?.value).toEqual({
			data: {
				body: 'MTcwMDA1NjM4MQ==',
				headers: {},
				status: 200,
				url: 'http://my-api.local',
			},
			kind: 'FETCH',
			revalidate: 30,
			tags: ['server-time'],
		});
	});

	it('should cache unstable_cache', async () => {
		await fsCache.set(
			'unstable-cache',
			{
				data: { body: '1700056381', headers: {}, status: 200, url: '' },
				kind: CachedRouteKind.FETCH,
				revalidate: 30,
			},
			{ fetchCache: true, tags: ['server-time2'] },
		);

		const res = await fsCache.get('unstable-cache', {
			kind: IncrementalCacheKind.FETCH,
			tags: ['server-time'],
		});

		expect(res?.value).toEqual({
			data: { body: '1700056381', headers: {}, status: 200, url: '' },
			kind: 'FETCH',
			revalidate: 30,
			tags: ['server-time2'],
		});
	});
});
