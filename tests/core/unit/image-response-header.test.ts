/* eslint-env jest */
import { ImageResponse } from 'next/og';
import React from 'react';

describe('new ImageResponse()', () => {
	const exactHeader = 'public, max-age=3600, s-maxage=3600';
	it('should merge object literal headers correctly', () => {
		const res = new ImageResponse(
			React.createElement(
				'div',
				{ style: { height: 10, width: 10 } },
				'ImageResponse',
			),
			{
				headers: {
					'Cache-Control': exactHeader,
				},
				height: 10,
				width: 10,
			},
		);
		expect(res.headers.get('Content-Type')).toBeTruthy();
		expect(res.headers.get('Cache-Control')).toBe(exactHeader);
	});
	it('should merge Headers instance correctly', () => {
		const res = new ImageResponse(
			React.createElement(
				'div',
				{ style: { height: 10, width: 10 } },
				'ImageResponse',
			),
			{
				headers: new Headers({
					'Cache-Control': exactHeader,
				}),
				height: 10,
				width: 10,
			},
		);
		expect(res.headers.get('Content-Type')).toBeTruthy();
		expect(res.headers.get('Cache-Control')).toBe(exactHeader);
	});
	it('should have default Cache-Control header', () => {
		const res = new ImageResponse(
			React.createElement(
				'div',
				{ style: { height: 10, width: 10 } },
				'ImageResponse',
			),
			{
				height: 10,
				width: 10,
			},
		);
		expect(res.headers.get('Cache-Control')).toBeTruthy();
	});
});
