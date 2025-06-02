export const getCategories = () => [
	{
		count: 11,
		items: [
			{ count: 4, name: 'Phones', slug: 'phones' },
			{ count: 5, name: 'Tablets', slug: 'tablets' },
			{ count: 2, name: 'Laptops', slug: 'laptops' },
		],
		name: 'Electronics',
		slug: 'electronics',
	},
	{
		count: 12,
		items: [
			{ count: 3, name: 'Tops', slug: 'tops' },
			{ count: 4, name: 'Shorts', slug: 'shorts' },
			{ count: 5, name: 'Shoes', slug: 'shoes' },
		],
		name: 'Clothing',
		slug: 'clothing',
	},
	{
		count: 10,
		items: [
			{ count: 5, name: 'Fiction', slug: 'fiction' },
			{ count: 2, name: 'Biography', slug: 'biography' },
			{ count: 3, name: 'Education', slug: 'education' },
		],
		name: 'Books',
		slug: 'books',
	},
	{
		count: 5,
		items: [],
		name: 'Shoes',
		prefetch: false,
		slug: 'shoes',
	},
];

export async function fetchCategoryBySlug(slug) {
	// Assuming it always return expected categories
	return getCategories().find((category) => category.slug === slug);
}

export async function fetchCategories() {
	return getCategories();
}

async function findSubCategory(category, subCategorySlug) {
	return category?.items.find((category) => category.slug === subCategorySlug);
}

export async function fetchSubCategory(categorySlug, subCategorySlug) {
	const category = await fetchCategoryBySlug(categorySlug);
	return findSubCategory(category, subCategorySlug);
}
