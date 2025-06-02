'use client';

import { useSelectedLayoutSegments } from 'next/navigation';

import { TabNavItem } from './TabNavItem';

const CategoryNav = ({ categories }) => {
	const selectedLayoutSegment = useSelectedLayoutSegments();

	return (
		<div style={{ display: 'flex' }}>
			<TabNavItem href="/nested-navigation" isActive={!selectedLayoutSegment}>
				Home
			</TabNavItem>

			{categories.map((item) => (
				<TabNavItem
					href={`/nested-navigation/${item.slug}`}
					isActive={item.slug === selectedLayoutSegment}
					key={item.slug}
					prefetch={item.prefetch}
				>
					{item.name}
				</TabNavItem>
			))}
		</div>
	);
};

export default CategoryNav;
