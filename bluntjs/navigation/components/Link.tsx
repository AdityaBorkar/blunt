import type { HTMLProps } from 'react';

export function Link({ href, ...props }: HTMLProps<HTMLAnchorElement>) {
	const $href = href; // TODO
	return <a href={$href} {...props} />;
}
