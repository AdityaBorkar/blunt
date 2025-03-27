export function CloudflareTunnel() {
	return {
		token: process.env.CLOUDFLARE_API_TOKEN,
		zone: process.env.CLOUDFLARE_ZONE_ID,
	};
}
