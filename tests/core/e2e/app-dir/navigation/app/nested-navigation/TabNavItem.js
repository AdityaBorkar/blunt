import Link from 'next/link';

export const TabNavItem = ({ children, href, prefetch }) => {
	return (
		<Link
			href={href}
			prefetch={prefetch}
			style={{ display: 'block', margin: '10px' }}
		>
			{children}
		</Link>
	);
};
