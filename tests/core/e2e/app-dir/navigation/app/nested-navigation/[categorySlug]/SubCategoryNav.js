'use client';

import { useSelectedLayoutSegments } from 'next/navigation';

import { TabNavItem } from '../TabNavItem';

const SubCategoryNav = ({ category }) => {
	const selectedLayoutSegment = useSelectedLayoutSegments();

	return (
		<div style={{ display: 'flex' }}>
			<TabNavItem
				href={`/nested-navigation/${category.slug}`}
				isActive={!selectedLayoutSegment}
			>
				All
			</TabNavItem>

			{category.items.map((item) => (
				<TabNavItem
					href={`/nested-navigation/${category.slug}/${item.slug}`}
					isActive={item.slug === selectedLayoutSegment}
					key={item.slug}
				>
					{item.name}
				</TabNavItem>
			))}
		</div>
	);
};

export default SubCategoryNav;
