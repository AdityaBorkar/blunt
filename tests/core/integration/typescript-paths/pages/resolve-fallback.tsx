import api from '@lib/b-only';
import type { JSX } from 'react';
export default function ResolveOrder(): JSX.Element {
	return <div>{api()}</div>;
}
