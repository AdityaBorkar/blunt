import { redirect } from 'next/navigation';

export function POST(_request) {
	redirect('/redirects/?success=true');
}
