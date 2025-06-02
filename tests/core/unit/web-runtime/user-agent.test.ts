/**
 * @jest-environment @edge-runtime/jest-environment
 */

import { NextRequest, userAgent, userAgentFromString } from 'next/server';

const UA_STRING =
	'Mozilla/5.0 (Macintosh; Intel Mac OS X 11_2_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.90 Safari/537.36';

it('parse an user agent', () => {
	const parser = userAgentFromString(UA_STRING);
	expect(parser.ua).toBe(
		'Mozilla/5.0 (Macintosh; Intel Mac OS X 11_2_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.90 Safari/537.36',
	);
	expect(parser.browser).toStrictEqual({
		major: '89',
		name: 'Chrome',
		version: '89.0.4389.90',
	});
	expect(parser.engine).toStrictEqual({
		name: 'Blink',
		version: '89.0.4389.90',
	});
	expect(parser.os).toStrictEqual({ name: 'Mac OS', version: '11.2.3' });
	expect(parser.cpu).toStrictEqual({ architecture: undefined });
	expect(parser.isBot).toBe(false);
});

it('parse empty user agent', () => {
	expect.assertions(3);
	for (const input of [undefined, null, '']) {
		expect(userAgentFromString(input)).toStrictEqual({
			browser: { major: undefined, name: undefined, version: undefined },
			cpu: { architecture: undefined },
			device: { model: undefined, type: undefined, vendor: undefined },
			engine: { name: undefined, version: undefined },
			isBot: false,
			os: { name: undefined, version: undefined },
			ua: '',
		});
	}
});

it('parse user agent from a NextRequest instance', () => {
	const request = new NextRequest('https://vercel.com', {
		headers: {
			'user-agent': UA_STRING,
		},
	});

	expect(userAgent(request)).toStrictEqual({
		browser: { major: '89', name: 'Chrome', version: '89.0.4389.90' },
		cpu: { architecture: undefined },
		device: { model: 'Macintosh', type: undefined, vendor: 'Apple' },
		engine: { name: 'Blink', version: '89.0.4389.90' },
		isBot: false,
		os: { name: 'Mac OS', version: '11.2.3' },
		ua: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 11_2_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.90 Safari/537.36',
	});
});
