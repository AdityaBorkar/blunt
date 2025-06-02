import Link from 'next/link';
import Router from 'next/router';
import { Component } from 'react';

let counter = 0;

const linkStyle = {
	marginRight: 10,
};

export default class extends Component {
	increase() {
		counter++;
		this.forceUpdate();
	}

	visitQueryStringPage() {
		const href = { pathname: '/nav/querystring', query: { id: 10 } };
		const as = { hash: '10', pathname: '/nav/querystring/10' };
		Router.push(href, as);
	}

	render() {
		return (
			<div className="nav-home">
				<Link href="/nav/about" id="about-link" style={linkStyle}>
					About
				</Link>
				<Link
					href="/empty-get-initial-props"
					id="empty-props"
					style={linkStyle}
				>
					Empty Props
				</Link>
				<Link href="/nav/self-reload" id="self-reload-link" style={linkStyle}>
					Self Reload
				</Link>
				<Link
					href="/nav/shallow-routing"
					id="shallow-routing-link"
					style={linkStyle}
				>
					Shallow Routing
				</Link>
				<Link href="/nav/redirect" id="redirect-link" style={linkStyle}>
					Redirect
				</Link>
				<Link
					as={{ hash: '10', pathname: '/nav/querystring/10' }}
					href={{ pathname: '/nav/querystring', query: { id: 10 } }}
					id="query-string-link"
					style={linkStyle}
				>
					QueryString
				</Link>
				<Link
					href="/nav/about"
					id="about-replace-link"
					replace
					style={linkStyle}
				>
					Replace state
				</Link>
				<Link
					as="/as/path"
					href="/nav/as-path"
					id="as-path-link"
					style={linkStyle}
				>
					As Path
				</Link>
				<Link href="/nav/as-path" id="as-path-link-no-as" style={linkStyle}>
					As Path (No as)
				</Link>
				<Link
					href="/nav/as-path-using-router"
					id="as-path-using-router-link"
					style={linkStyle}
				>
					As Path (Using Router)
				</Link>
				<Link href="/nav/on-click?count=1" id="on-click-link" style={linkStyle}>
					An element with onClick
				</Link>
				<Link href="/nav/about" id="target-link" target="_blank">
					An element with target
				</Link>

				<svg
					fill="none"
					height={24}
					width={24}
					xmlns="http://www.w3.org/2000/svg"
				>
					<Link href="/nav/about" id="in-svg-link" style={{ display: 'block' }}>
						<path
							clipRule="evenodd"
							d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0Zm4.5 18a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"
							fill="#335BF1"
							fillRule="evenodd"
						/>
					</Link>
				</svg>

				<button
					id="query-string-button"
					onClick={() => this.visitQueryStringPage()}
					style={linkStyle}
				>
					Visit QueryString Page
				</button>

				<p>This is the home.</p>
				<div id="counter">Counter: {counter}</div>
				<button id="increase" onClick={() => this.increase()}>
					Increase
				</button>
				<Link href="/nav/hash-changes#item-400" id="scroll-to-hash">
					Scroll to hash
				</Link>
				<Link href="/nav/hash-changes#中文" id="scroll-to-cjk-hash">
					Scroll to CJK hash
				</Link>
			</div>
		);
	}
}
