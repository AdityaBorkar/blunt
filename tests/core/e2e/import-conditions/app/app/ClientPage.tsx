'use client';

import * as react from 'library-with-exports/react';
import * as serverFavoringBrowser from 'library-with-exports/server-favoring-browser';
import * as serverFavoringEdge from 'library-with-exports/server-favoring-edge';
import * as React from 'react';

export default function ClientPage({
	action,
	server,
}: {
	action: () => Promise<Record<string, string>>;
	server: unknown;
}) {
	const [actionValue, formAction, isPending] = React.useActionState(
		action,
		undefined,
	);
	const [client, setClient] = React.useState<unknown | null>(null);
	React.useEffect(() => {
		setClient({
			react: react.condition,
			serverFavoringBrowser: serverFavoringBrowser.condition,
			serverFavoringEdge: serverFavoringEdge.condition,
		});
	}, []);

	return (
		<form action={formAction}>
			<input type="submit" />
			<output aria-busy={client === null || isPending}>
				{client === null ? (
					<pre>{JSON.stringify({ server }, null, 2)}</pre>
				) : (
					<pre>
						{JSON.stringify({ action: actionValue, client, server }, null, 2)}
					</pre>
				)}
			</output>
		</form>
	);
}
