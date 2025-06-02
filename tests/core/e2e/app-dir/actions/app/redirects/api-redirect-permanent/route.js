import { permanentRedirect } from 'next/navigation';

export function POST(_request) {
	permanentRedirect('/redirects/?success=true');
}
