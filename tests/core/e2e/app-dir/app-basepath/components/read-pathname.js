import { usePathname } from 'next/navigation';

export function ReadPathname() {
	const pathname = usePathname();
	return (
		<div data-pathname={pathname} id="pathname">
			{pathname}
		</div>
	);
}
