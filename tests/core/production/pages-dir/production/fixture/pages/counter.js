import Link from 'next/link';
import Router from 'next/router';
import { Component } from 'react';

let counter = 0;

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
			<div id="counter-page">
				<Link href="/no-such-page" id="no-such-page">
					No Such Page
				</Link>
				<br />
				<Link href="/no-such-page" id="no-such-page-prefetch" prefetch>
					No Such Page (with prefetch)
				</Link>
				<p>This is the home.</p>
				<div id="counter">Counter: {counter}</div>
				<button id="increase" onClick={() => this.increase()}>
					Increase
				</button>
			</div>
		);
	}
}
