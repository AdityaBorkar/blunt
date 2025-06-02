// This page is forced into dynamic rendering because POST requests to
// a static/ISR page will cause an error when deployed.
export const dynamic = 'force-dynamic';

export default function Home() {
	return (
		<main id="redirect-page">
			<h1>POST /api-redirect (`redirect()`)</h1>
			<form action="/redirects/api-redirect" method="POST">
				<input id="submit-api-redirect" type="submit" value="Submit" />
			</form>
			<h1>POST /api-redirect-permanent (`permanentRedirect()`)</h1>
			<form action="/redirects/api-redirect-permanent" method="POST">
				<input
					id="submit-api-redirect-permanent"
					type="submit"
					value="Submit"
				/>
			</form>
			<h1>POST /api-reponse-redirect-307</h1>
			<form action="/redirects/api-redirect-307" method="POST">
				<input id="submit-api-redirect-307" type="submit" value="Submit" />
			</form>
			<h1>POST /api-reponse-redirect-308</h1>
			<form action="/redirects/api-redirect-308" method="POST">
				<input id="submit-api-redirect-308" type="submit" value="Submit" />
			</form>
		</main>
	);
}
