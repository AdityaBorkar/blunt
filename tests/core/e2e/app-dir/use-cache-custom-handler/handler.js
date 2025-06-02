// @ts-check

const defaultCacheHandler =
	require('next/dist/server/lib/cache-handlers/default').default;

/**
 * @type {import('next/dist/server/lib/cache-handlers/types').CacheHandlerV2}
 */
const cacheHandler = {
	async expireTags(...tags) {
		console.log('CustomCacheHandler::expireTags', JSON.stringify(tags));
		return defaultCacheHandler.expireTags(...tags);
	},
	async get(cacheKey) {
		console.log('CustomCacheHandler::get', cacheKey);
		return defaultCacheHandler.get(cacheKey);
	},

	async getExpiration(...tags) {
		console.log('CustomCacheHandler::getExpiration', JSON.stringify(tags));
		return defaultCacheHandler.getExpiration(...tags);
	},

	async refreshTags() {
		console.log('CustomCacheHandler::refreshTags');
		return defaultCacheHandler.refreshTags();
	},

	async set(cacheKey, pendingEntry) {
		console.log('CustomCacheHandler::set', cacheKey);
		return defaultCacheHandler.set(cacheKey, pendingEntry);
	},
};

module.exports = cacheHandler;
