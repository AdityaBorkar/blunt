// @ts-check

const defaultCacheHandler =
	require('next/dist/server/lib/cache-handlers/default').default;

/**
 * @type {import('next/dist/server/lib/cache-handlers/types').CacheHandler}
 */
const cacheHandler = {
	async expireTags(...tags) {
		console.log('LegacyCustomCacheHandler::expireTags', JSON.stringify(tags));
		return defaultCacheHandler.expireTags(...tags);
	},
	async get(cacheKey, softTags) {
		console.log(
			'LegacyCustomCacheHandler::get',
			cacheKey,
			JSON.stringify(softTags),
		);
		return defaultCacheHandler.get(cacheKey);
	},

	async receiveExpiredTags(...tags) {
		console.log(
			'LegacyCustomCacheHandler::receiveExpiredTags',
			JSON.stringify(tags),
		);
	},

	async set(cacheKey, pendingEntry) {
		console.log('LegacyCustomCacheHandler::set', cacheKey);
		return defaultCacheHandler.set(cacheKey, pendingEntry);
	},
};

module.exports = cacheHandler;
