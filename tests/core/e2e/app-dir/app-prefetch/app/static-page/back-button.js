'use client';

export function BackButton() {
	return (
		<button
			id="go-back"
			onClick={() => {
				window.history.back();
			}}
			type="button"
		>
			Go back
		</button>
	);
}
