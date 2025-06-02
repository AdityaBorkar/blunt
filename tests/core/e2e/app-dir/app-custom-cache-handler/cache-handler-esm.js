const cache = new Map();

class CacheHandler {
	constructor(options) {
		this.options = options;
		this.cache = {};
		console.log('initialized custom cache-handler');
		console.log('cache handler - esm default export');
	}

	async get(key) {
		console.log('key', key);
		console.log('cache-handler get', key);
		return cache.get(key);
	}

	async set(key, data) {
		console.log('set key', key);
		console.log('cache-handler set', key);
		cache.set(key, {
			lastModified: Date.now(),
			value: data,
		});
	}
}

export default CacheHandler;
