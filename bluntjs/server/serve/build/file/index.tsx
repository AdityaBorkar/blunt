export function handleFile(file: File) {
	return new Response(file, { headers: { 'Content-Type': file.type } });
}
