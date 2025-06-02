import { createNext, type NextInstance } from 'e2e-utils';
import { renderViaHTTP } from 'next-test-utils';

describe('handle-non-hoisted-swc-helpers', () => {
	let next: NextInstance;

	beforeAll(async () => {
		next = await createNext({
			dependencies: {},
			files: {
				'pages/index.js': `
          export default function Page() {
            return <p>hello world</p>
          }

          export function getServerSideProps() {
            const helper = require('@swc/helpers/_/_object_spread')
            console.log(helper)
            return {
              props: {
                now: Date.now()
              }
            }
          }
        `,
			},
			installCommand:
				'npm install; mkdir -p node_modules/next/node_modules/@swc; mv node_modules/@swc/helpers node_modules/next/node_modules/@swc/',
		});
	});
	afterAll(() => next.destroy());

	it('should work', async () => {
		const html = await renderViaHTTP(next.url, '/');
		expect(html).toContain('hello world');
	});
});
