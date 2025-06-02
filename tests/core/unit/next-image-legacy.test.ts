/* eslint-env jest */

import cheerio from 'cheerio';
import Image from 'next/legacy/image';
import React from 'react';
import ReactDOM from 'react-dom/server';

describe('Image Legacy Rendering', () => {
	it('should render Image on its own', async () => {
		const element = React.createElement(Image, {
			height: 100,
			id: 'unit-image',
			loading: 'eager',
			src: '/test.png',
			width: 100,
		});
		const html = ReactDOM.renderToString(element);
		const $ = cheerio.load(html);
		const img = $('#unit-image');
		expect(img.attr('id')).toBe('unit-image');
		expect(img.attr('src')).toContain('test.png');
		expect(img.attr('srcset')).toContain('test.png');
	});

	it('should only render noscript element when lazy loading', async () => {
		const element = React.createElement(Image, {
			height: 100,
			loading: 'eager',
			src: '/test.png',
			width: 100,
		});
		const element2 = React.createElement(Image, {
			height: 100,
			priority: true,
			src: '/test.png',
			width: 100,
		});
		const elementLazy = React.createElement(Image, {
			height: 100,
			src: '/test.png',
			width: 100,
		});
		const $ = cheerio.load(ReactDOM.renderToString(element));
		const $2 = cheerio.load(ReactDOM.renderToString(element2));
		const $lazy = cheerio.load(ReactDOM.renderToString(elementLazy));
		expect($('noscript').length).toBe(0);
		expect($2('noscript').length).toBe(0);
		expect($lazy('noscript').length).toBe(1);
	});

	it('should render noscript element when placeholder=blur', async () => {
		const element1 = React.createElement(Image, {
			blurDataURL: 'data:image/png;base64',
			height: 100,
			loading: 'eager',
			placeholder: 'blur',
			src: '/test.png',
			width: 100,
		});
		const element2 = React.createElement(Image, {
			blurDataURL: 'data:image/png;base64',
			height: 100,
			loading: 'eager',
			placeholder: 'blur',
			src: '/test.png',
			width: 100,
		});
		const element3 = React.createElement(Image, {
			blurDataURL: 'data:image/png;base64',
			height: 100,
			placeholder: 'blur',
			priority: true,
			src: '/test.png',
			width: 100,
		});
		const $1 = cheerio.load(ReactDOM.renderToString(element1));
		const $2 = cheerio.load(ReactDOM.renderToString(element2));
		const $3 = cheerio.load(ReactDOM.renderToString(element3));
		expect($1('noscript').length).toBe(1);
		expect($2('noscript').length).toBe(1);
		expect($3('noscript').length).toBe(1);
	});

	it('should render the correct sizes passed when a noscript element is rendered', async () => {
		const element = React.createElement(Image, {
			height: 100,
			sizes: '50vw',
			src: '/test.png',
			width: 100,
		});
		const $ = cheerio.load(ReactDOM.renderToString(element));
		const noscriptImg = $('noscript img');
		expect(noscriptImg.attr('sizes')).toBe('50vw');
		expect(noscriptImg.attr('srcset')).toContain(
			'/_next/image?url=%2Ftest.png&w=384&q=75 384w',
		);
	});
});
