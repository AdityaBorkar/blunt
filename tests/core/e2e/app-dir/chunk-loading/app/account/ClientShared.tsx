'use client';

import { LazyShared } from '../../components/LazyShared';
import { SuperShared } from '../../components/SuperShared';

export function ClientShared() {
	return <SuperShared from="fizz" />;
}

export function ClientDynamicShared() {
	return <LazyShared />;
}
