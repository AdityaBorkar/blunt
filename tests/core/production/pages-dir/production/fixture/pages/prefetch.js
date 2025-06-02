import Link from 'next/link';

export default () => {
	return (
		<div>
			<ul>
				<li>
					<Link href="/" id="prefetch-1" prefetch>
						index
					</Link>
				</li>
				<li>
					<Link href="/process-env" id="prefetch-2" prefetch>
						process env
					</Link>
				</li>
				<li>
					<Link href="/counter" id="prefetch-3" prefetch>
						counter
					</Link>
				</li>
				<li>
					<Link href="/about" id="prefetch-4" prefetch>
						about
					</Link>
				</li>
			</ul>
		</div>
	);
};
