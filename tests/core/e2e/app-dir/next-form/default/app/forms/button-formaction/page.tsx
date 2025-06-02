import Form from 'next/form';

export default function Home() {
	return (
		<Form action="/" id="search-form">
			<input name="query" />
			<button formAction="/search" type="submit">
				Submit
			</button>
		</Form>
	);
}
