import { NextDynamicClientComponent } from './dynamic-imports/dynamic-client';
import {
	NextDynamicServerComponent,
	NextDynamicServerImportClientComponent,
	// NextDynamicNoSSRServerComponent,
} from './dynamic-imports/dynamic-server';
import { LazyClientComponent } from './dynamic-imports/react-lazy-client';

export default function page() {
	return (
		<div id="content">
			<LazyClientComponent />
			<NextDynamicServerComponent />
			<NextDynamicClientComponent />
			<NextDynamicServerImportClientComponent />
			{/* <NextDynamicNoSSRServerComponent /> */}
		</div>
	);
}
