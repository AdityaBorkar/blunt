import { cn } from '@/lib/utils';

export function Button({
	children,
	className,
	...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
	return (
		<button
			className={cn(
				'rounded-md border border-neutral-700/50 bg-neutral-800 px-3 py-1.5 font-medium text-neutral-300 transition-all hover:bg-neutral-700/60',
				className,
			)}
			{...props}
		>
			{children}
		</button>
	);
}
