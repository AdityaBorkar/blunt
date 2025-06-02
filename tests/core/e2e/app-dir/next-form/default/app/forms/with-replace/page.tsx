import Form from 'next/form';

export default function Home() {
	return (
		<Form action="/search" id="search-form" replace>
			<input name="query" />
			<button type="submit">Submit</button>
		</Form>
	);
}
