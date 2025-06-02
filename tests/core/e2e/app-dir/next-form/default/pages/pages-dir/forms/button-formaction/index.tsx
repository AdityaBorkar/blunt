import Form from 'next/form';

export default function Home() {
	return (
		<Form action="/pages-dir/" id="search-form">
			<input name="query" />
			<button formAction="/pages-dir/search" type="submit">
				Submit
			</button>
		</Form>
	);
}
