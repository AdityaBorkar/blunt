'use client';

import World3 from 'app-cjs-esm-package/entry';
import World1 from 'app-esm-package1/entry';
import World2 from 'app-esm-package2/entry';

export default function Index() {
	return (
		<div>
			Hello {World1}+{World2}+{World3}
		</div>
	);
}
