export function fileBasedRouter(props?: {
	include: string[];
	exclude?: string[];
}) {
	// ...

	return props?.include[0] || 'src/app';
}
