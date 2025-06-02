import { createNext, type NextInstance } from 'e2e-utils';
import { renderViaHTTP } from 'next-test-utils';

describe('promise export', () => {
	let next: NextInstance;

	beforeAll(async () => {
		next = await createNext({
			dependencies: {},
			files: {
				'next.config.js': `
          module.exports = new Promise((resolve) => {
            resolve({
              basePath: '/docs'
            })
          })
        `,
				'pages/index.js': `
          export default function Page() { 
            return <p>hello world</p>
          } 
        `,
			},
		});
	});
	afterAll(() => next.destroy());

	it('should work', async () => {
		const html = await renderViaHTTP(next.url, '/docs');
		expect(html).toContain('hello world');
	});
});
