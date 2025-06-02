/* eslint-env jest */

import Link from 'next/link';
import React from 'react';
import ReactDOM from 'react-dom/server';

describe('Link rendering', () => {
	it('should render Link on its own', async () => {
		const element = React.createElement(
			Link,
			{
				href: '/my-path',
			},
			'to another page',
		);
		const html = ReactDOM.renderToString(element);
		expect(html).toMatchInlineSnapshot(
			`"<a href="/my-path">to another page</a>"`,
		);
	});
});
