import type { ReactNode } from 'react';
import Balancer from 'react-wrap-balancer';

export function Caption({ children }: { children: ReactNode }) {
	return (
		<p className="my-3 text-center font-mono text-gray-500 text-xs leading-normal">
			<Balancer>
				<span className="[&>a]:post-link">{children}</span>
			</Balancer>
		</p>
	);
}
