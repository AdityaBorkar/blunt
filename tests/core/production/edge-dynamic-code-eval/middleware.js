import * as bind from 'function-bind';
import { NextResponse } from 'next/server';

console.log(bind);
export default async function middleware(_request) {
	return NextResponse.next();
}
