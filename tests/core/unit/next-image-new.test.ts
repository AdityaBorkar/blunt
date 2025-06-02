/* eslint-env jest */

import cheerio from 'cheerio';
import Image from 'next/image';
import React from 'react';
import ReactDOMServer from 'react-dom/server';

describe('Image rendering', () => {
	it('should render Image on its own', async () => {
		const element = React.createElement(Image, {
			alt: 'a nice image',
			height: 100,
			id: 'unit-image',
			loading: 'eager',
			src: '/test.png',
			width: 100,
		});
		const html = ReactDOMServer.renderToString(element);
		const $ = cheerio.load(html);
		const img = $('#unit-image');
		// order matters here
		expect(img.attr()).toStrictEqual({
			alt: 'a nice image',
			'data-nimg': '1',
			decoding: 'async',
			height: '100',
			id: 'unit-image',
			loading: 'eager',
			src: '/_next/image?url=%2Ftest.png&w=256&q=75',
			srcset:
				'/_next/image?url=%2Ftest.png&w=128&q=75 1x, /_next/image?url=%2Ftest.png&w=256&q=75 2x',
			style: 'color:transparent',
			width: '100',
		});
	});

	it('should only render noscript element when lazy loading', async () => {
		const element = React.createElement(Image, {
			alt: 'test',
			height: 100,
			loading: 'eager',
			src: '/test.png',
			width: 100,
		});
		const element2 = React.createElement(Image, {
			alt: 'test',
			height: 100,
			priority: true,
			src: '/test.png',
			width: 100,
		});
		const elementLazy = React.createElement(Image, {
			alt: 'test',
			height: 100,
			src: '/test.png',
			width: 100,
		});
		const $ = cheerio.load(ReactDOMServer.renderToString(element));
		const $2 = cheerio.load(ReactDOMServer.renderToString(element2));
		const $lazy = cheerio.load(ReactDOMServer.renderToString(elementLazy));
		expect($('noscript').length).toBe(0);
		expect($2('noscript').length).toBe(0);
		expect($lazy('noscript').length).toBe(0);
	});

	it('should not render noscript', async () => {
		const element1 = React.createElement(Image, {
			alt: 'test',
			blurDataURL: 'data:image/png;base64',
			height: 100,
			loading: 'eager',
			placeholder: 'blur',
			src: '/test.png',
			width: 100,
		});
		const element2 = React.createElement(Image, {
			alt: 'test',
			blurDataURL: 'data:image/png;base64',
			height: 100,
			loading: 'eager',
			placeholder: 'blur',
			src: '/test.png',
			width: 100,
		});
		const element3 = React.createElement(Image, {
			alt: 'test',
			blurDataURL: 'data:image/png;base64',
			height: 100,
			placeholder: 'blur',
			priority: true,
			src: '/test.png',
			width: 100,
		});
		const $1 = cheerio.load(ReactDOMServer.renderToString(element1));
		const $2 = cheerio.load(ReactDOMServer.renderToString(element2));
		const $3 = cheerio.load(ReactDOMServer.renderToString(element3));
		expect($1('noscript').length).toBe(0);
		expect($2('noscript').length).toBe(0);
		expect($3('noscript').length).toBe(0);
	});
});
