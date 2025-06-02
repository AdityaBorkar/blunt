import Link from 'next/link';

export function A({ children, className = '', href, ...props }) {
	return (
		<Link
			className={`border-gray-300 border-b text-gray-600 transition-[border-color] hover:border-gray-600 dark:border-gray-500 dark:text-white dark:hover:border-white ${className}`}
			href={href}
			{...props}
		>
			{children}
		</Link>
	);
}
