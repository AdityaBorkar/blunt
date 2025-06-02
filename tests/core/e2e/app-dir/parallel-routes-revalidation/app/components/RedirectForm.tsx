'use client';

export function RedirectForm({ action }: { action: () => Promise<void> }) {
	return (
		<form action={action}>
			<button className="button" id="redirect" type="submit">
				Redirect to Home
			</button>
		</form>
	);
}
