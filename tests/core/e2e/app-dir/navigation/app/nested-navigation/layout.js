import { use } from 'react';

import CategoryNav from './CategoryNav';
import { fetchCategories } from './getCategories';

export default function Layout({ children }) {
	const categories = use(fetchCategories());
	return (
		<div>
			<div>
				<CategoryNav categories={categories} />
			</div>

			<div>{children}</div>
		</div>
	);
}
