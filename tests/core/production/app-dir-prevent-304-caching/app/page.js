export default async function Page() {
	const time = await new Promise((resolve) => {
		setTimeout(500, resolve(Date.now()));
	});

	return <div>Time: {time}</div>;
}

export const revalidate = 1;
