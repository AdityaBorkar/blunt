import Link, { type LinkProps } from 'next/link';

export default () => {
	const props: LinkProps = {
		as: '/as-page',
		href: '/page',
	};

	return <Link {...props}>Test</Link>;
};
