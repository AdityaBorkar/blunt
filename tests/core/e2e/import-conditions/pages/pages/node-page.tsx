import * as react from 'library-with-exports/react';
import * as serverFavoringBrowser from 'library-with-exports/server-favoring-browser';
import * as serverFavoringEdge from 'library-with-exports/server-favoring-edge';
import * as React from 'react';

export const config = {
	runtime: 'nodejs',
};

let server = {
	react: react.condition,
	serverFavoringBrowser: serverFavoringBrowser.condition,
	serverFavoringEdge: serverFavoringEdge.condition,
};
if (typeof window !== 'undefined') {
	server = JSON.parse(
		document.querySelector('[data-testid="server"]')?.textContent!,
	);
}

export default function Page() {
	const [client, setClient] = React.useState<unknown | null>(null);

	React.useLayoutEffect(() => {
		setClient({
			react: react.condition,
			serverFavoringBrowser: serverFavoringBrowser.condition,
			serverFavoringEdge: serverFavoringEdge.condition,
		});
	}, []);

	return (
		<output aria-busy={client === null}>
			{client === null ? (
				<pre data-testid="server">{JSON.stringify(server, null, 2)}</pre>
			) : (
				<pre data-testid="client" suppressHydrationWarning={true}>
					{JSON.stringify({ client, server }, null, 2)}
				</pre>
			)}
		</output>
	);
}
