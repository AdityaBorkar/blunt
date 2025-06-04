import { PRECEDENCE } from '@/server/utils/constants';

export function getMatchedFiles(files: FileType[], pathname: string) {
	// ...

	files.forEach((file) => {
		console.log({ file });
	});

	const sorted_files = files
		.filter((file) => file.httpPath === pathname && file.method === method)
		.toSorted((a, b) => {
			const diff = a.httpPath.length - b.httpPath.length;
			if (diff !== 0) return diff;
			return PRECEDENCE.indexOf(a.type) - PRECEDENCE.indexOf(b.type);
		});
	// TODO: Find Duplicate Entry Points

	return sorted_files;
}
