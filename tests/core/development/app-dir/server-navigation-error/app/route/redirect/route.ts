import { redirect } from 'next/navigation';

export async function GET(_req) {
	redirect('/');
}
