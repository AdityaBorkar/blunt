import { MyModuleClientComponent } from 'my-module/MyModuleClientComponent';
import { NextResponse } from 'next/server';

import { ClientComponent } from '../../ClientComponent';

export function GET() {
	return NextResponse.json({
		clientComponent: typeof ClientComponent,
		myModuleClientComponent: typeof MyModuleClientComponent,
	});
}
