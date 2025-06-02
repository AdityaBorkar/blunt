import Form from 'next/form';

export default function Home() {
	return (
		<Form action="/" id="search-form">
			<input name="query" />
			{/* Note that unlike `action`, we have to include the basePath below */}
			{/*                              vvvvvv */}
			<button formAction="/base/search" type="submit">
				Submit
			</button>
		</Form>
	);
}
