import NotAliasedToDTS from 'd-ts-alias';
import type { JSX } from 'react';

export default function HelloPage(): JSX.Element {
	return (
		<div>
			<NotAliasedToDTS />
		</div>
	);
}
