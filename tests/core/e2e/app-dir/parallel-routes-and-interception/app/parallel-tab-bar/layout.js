import Link from 'next/link';

function AudienceNav() {
	return (
		<ul>
			<li>
				<Link href="/parallel-tab-bar" id="home-link-audience">
					Home
				</Link>
			</li>
			<li>
				<Link href="/parallel-tab-bar/demographics" id="demographics-link">
					Demographics
				</Link>
			</li>
			<li>
				<Link href="/parallel-tab-bar/subscribers" id="subscribers-link">
					Subscribers
				</Link>
			</li>
		</ul>
	);
}

function ViewsNav() {
	return (
		<ul>
			<li>
				<Link href="/parallel-tab-bar" id="home-link-views">
					Home
				</Link>
			</li>
			<li>
				<Link href="/parallel-tab-bar/impressions" id="impressions-link">
					Impressions
				</Link>
			</li>
			<li>
				<Link href="/parallel-tab-bar/view-duration" id="view-duration-link">
					View Duration
				</Link>
			</li>
		</ul>
	);
}
export default function Layout({ children, audience, views }) {
	return (
		<>
			<h1>Tab Bar Layout</h1>
			{children}

			<h2>Audience</h2>
			<AudienceNav />
			{audience}

			<h2>Views</h2>
			<ViewsNav />
			{views}
		</>
	);
}
