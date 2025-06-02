'use client';

import { redirectAction } from './action';

export default function Page() {
	return (
		<div>
			<form>
				<button
					formAction={() => redirectAction('/another')}
					id="redirect-relative"
				>
					redirect internal with relative path
				</button>
			</form>
			<form>
				<button
					formAction={() => redirectAction(`${location.origin}/base/another`)}
					id="redirect-absolute-internal"
				>
					redirect internal with domain (including basePath)
				</button>
			</form>
			<form>
				<button
					formAction={() =>
						redirectAction(`${location.origin}/outsideBasePath`)
					}
					id="redirect-absolute-external"
				>
					redirect external with domain (excluding basePath)
				</button>
			</form>
		</div>
	);
}
