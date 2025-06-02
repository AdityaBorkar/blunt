'use client';

import Link from 'next/link';
import { useState } from 'react';

type PaginationConfig = {
	start: number;
	end: number;
};

export default function LinkCancellationPage() {
	const [areLinksVisible, setLinksVisibility] = useState(false);
	const [showMoreLinks, setShowMoreLinks] = useState(false);

	return (
		<>
			<p>
				This page is used to test that a prefetch scheduled when a Link enters
				the viewport is cancelled when the Link exits. The visibility toggle
				does not affect whether the links are mounted, only whether they are
				visible (using the `hidden` attribute).
			</p>
			<label>
				<input
					checked={areLinksVisible}
					onChange={() => setLinksVisibility(!areLinksVisible)}
					type="checkbox"
				/>
				{areLinksVisible ? 'Hide' : 'Show'} Links
			</label>
			<ul hidden={!areLinksVisible} id="links-container">
				<Links end={7} start={1} />
				{showMoreLinks ? (
					<Links end={10} start={8} />
				) : (
					<li>
						<form>
							<button
								formAction={() => setShowMoreLinks(true)}
								id="show-more-links"
							>
								Show more links
							</button>
						</form>
					</li>
				)}
			</ul>
		</>
	);
}

function Links({ start, end }: PaginationConfig) {
	const links: Array<React.ReactNode> = [];
	for (let pageNumber = start; pageNumber <= end; pageNumber++) {
		links.push(
			<li key={pageNumber}>
				<Link href={`/cancellation/${pageNumber}`}>
					Link to page {pageNumber}
				</Link>
			</li>,
		);
	}
	return links;
}
