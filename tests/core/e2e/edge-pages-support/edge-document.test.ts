import { join } from 'node:path';
import { FileRef, nextTestSetup } from 'e2e-utils';

// x-ref: https://github.com/vercel/next.js/issues/45189
describe('edge render - custom _document with edge runtime', () => {
	const { next } = nextTestSetup({
		files: {
			'next.config.js': new FileRef(join(__dirname, 'app', 'next.config.js')),
			'pages/_document.js': `
        import Document, { Html, Head, Main, NextScript } from 'next/document'
        export default class MyDocument extends Document {
          render() {
            return (
              <Html>
                <Head />
                <body>
                  <Main />
                  <NextScript />
                </body>
              </Html>
            )
          }
        }

        export const config = {
          runtime: 'experimental-edge',
        }
      `,
			'pages/index.js': new FileRef(
				join(__dirname, 'app', 'pages', 'index.js'),
			),
		},
	});

	it('should render page properly', async () => {
		const $ = await next.render$('/');
		expect($('#page').text()).toBe('/index');
	});
});
