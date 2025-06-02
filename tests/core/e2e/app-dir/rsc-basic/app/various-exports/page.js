// shared named exports

import { Cjs as CjsClient } from '../../components/cjs-client';
import { Cjs as CjsShared } from '../../components/cjs-server';
// client default, named exports
import DefaultArrow, {
	Named as ClientNamed,
} from '../../components/client-exports';
// client exports all
import { One, Two, TwoAliased } from '../../components/export-all';
import { a, b, c, d, e } from '../../components/shared-exports';

export default function Page() {
	return (
		<div>
			<div>
				{a}
				{b}
				{c}
				{d}
				{e[0]}
			</div>
			<div>
				<DefaultArrow />
			</div>
			<div>
				<ClientNamed />
			</div>
			<div>
				<CjsShared />
			</div>
			<div>
				<CjsClient />
			</div>
			<div>
				Export All: <One />, <Two />, <TwoAliased />
			</div>
		</div>
	);
}
