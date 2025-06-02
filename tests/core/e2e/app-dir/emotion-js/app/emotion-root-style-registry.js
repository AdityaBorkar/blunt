'use client';

import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import { useServerInsertedHTML } from 'next/navigation';
import { useState } from 'react';

export default function RootStyleRegistry({ children }) {
	const [{ cache, flush }] = useState(() => {
		const cache = createCache({ key: 'emotion-cache' });
		cache.compat = true;
		const prevInsert = cache.insert;
		let inserted = [];
		cache.insert = (...args) => {
			const serialized = args[1];
			if (cache.inserted[serialized.name] === undefined) {
				inserted.push(serialized.name);
			}
			return prevInsert(...args);
		};
		const flush = () => {
			const prevInserted = inserted;
			inserted = [];
			return prevInserted;
		};
		return { cache, flush };
	});

	useServerInsertedHTML(() => {
		const names = flush();
		if (names.length === 0) return null;
		let styles = '';
		for (const name of names) {
			styles += cache.inserted[name];
		}
		return (
			<style
				dangerouslySetInnerHTML={{
					__html: styles,
				}}
				data-emotion={`${cache.key} ${names.join(' ')}`}
			/>
		);
	});

	return <CacheProvider value={cache}>{children}</CacheProvider>;
}
