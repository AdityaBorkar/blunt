export const dynamic = 'force-dynamic';

export default function Page(_props) {
	throw new Error('this should not attempt prerendering with force-dynamic');
}
