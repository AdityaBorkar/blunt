import { AsyncLocalStorage } from 'node:async_hooks';
import { type NextRequest, NextResponse } from 'next/server';

const storage = new AsyncLocalStorage<{}>();

export async function middleware(_request: NextRequest) {
	storage.run({}, () => {});

	return NextResponse.next();
}
