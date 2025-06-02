/* eslint-env jest */
import { transformSync } from '@babel/core';

const babel = (code) =>
	transformSync(code, {
		babelrc: false,
		caller: {
			isDev: false,
			name: 'tests',
		},
		compact: true,
		configFile: false,
		filename: 'page.tsx',
		plugins: [require('next/dist/build/babel/plugins/next-page-config')],
		presets: ['@babel/preset-typescript'],
		sourceType: 'module',
	} as any).code;

describe('babel plugin (next-page-config)', () => {
	test('export config with type annotation', () => {
		const output = babel('export const config: PageConfig = {};');

		expect(output).toMatch(`export const config={};`);
	});

	test('export config with AsExpression', () => {
		const output = babel('export const config = {} as PageConfig;');

		expect(output).toMatch('export const config={};');
	});

	test('amp enabled', () => {
		jest.spyOn(Date, 'now').mockReturnValue(1234);
		const output = babel(`
      export const config = { amp: true }

      function About(props) {
        return <h3>My AMP About Page!</h3>
      }
      
      export default About`);

		expect(output).toMatch(
			'const __NEXT_DROP_CLIENT_FILE__="__NEXT_DROP_CLIENT_FILE__ 1234";',
		);
	});

	test('amp hybrid enabled', () => {
		const output = babel(`
      export const config = { amp: 'hybrid' }

      function About(props) {
        return <h3>My AMP About Page!</h3>
      }
      
      export default About`);

		expect(output).toMatch(
			"export const config={amp:'hybrid'};function About(props){return<h3>My AMP About Page!</h3>;}export default About;",
		);
	});
});
