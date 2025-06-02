'use client';

import { redirectAction } from '../actions';

export default function Page() {
	return (
		<div>
			<form>
				<button
					formAction={() => redirectAction('/redirect-target')}
					id="redirect-relative"
				>
					redirect relative
				</button>
			</form>
			<form>
				<button
					formAction={() =>
						redirectAction(
							'https://next-data-api-endpoint.vercel.app/api/random?page',
						)
					}
					id="redirect-external"
				>
					redirect external
				</button>
			</form>
			<form>
				<button
					formAction={() =>
						redirectAction(`${location.origin}/redirect-target`)
					}
					id="redirect-absolute"
				>
					redirect internal with domain
				</button>
			</form>
		</div>
	);
}
