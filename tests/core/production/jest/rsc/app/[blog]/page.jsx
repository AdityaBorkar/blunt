export async function generateMetadata({ params: { blog: title } }) {
	return { description: `A blog post about ${title}`, title };
}

export default function Page({ params }) {
	return <h1>All about {params.blog}</h1>;
}
