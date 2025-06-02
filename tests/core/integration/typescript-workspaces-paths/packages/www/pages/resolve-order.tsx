import api from '@lib/api';
import type { JSX } from 'react';
export default function ResolveOrder(): JSX.Element {
	return <div>{api()}</div>;
}
