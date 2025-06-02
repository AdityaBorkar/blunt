import { respond } from 'compat-next-server-module';

export async function middleware(_request) {
	return await respond();
}
