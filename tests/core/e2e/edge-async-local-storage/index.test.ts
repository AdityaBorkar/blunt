/* eslint-disable jest/valid-expect-in-promise */
import { createNext, type NextInstance } from 'e2e-utils';
import { fetchViaHTTP } from 'next-test-utils';

describe('edge api can use async local storage', () => {
	let next: NextInstance;

	const cases = [
		{
			code: `
        export const config = { runtime: 'edge' }
        const storage = new AsyncLocalStorage()
  
        export default async function handler(request) {
          const id = request.headers.get('req-id')
          return storage.run({ id }, async () => {
            await getSomeData()
            return Response.json(storage.getStore())
          })
        }
  
        async function getSomeData() {
          try {
            const response = await fetch('https://example.vercel.sh')
            await response.text()
          } finally {
            return true
          }
        }
      `,
			expectResponse: (response, id) =>
				expect(response).toMatchObject({ json: { id }, status: 200 }),
			title: 'a single instance',
		},
		{
			code: `
        export const config = { runtime: 'edge' }
        const topStorage = new AsyncLocalStorage()
  
        export default async function handler(request) {
          const id = request.headers.get('req-id')
          return topStorage.run({ id }, async () => {
            const nested = await getSomeData(id)
            return Response.json({ ...nested, ...topStorage.getStore() })
          })
        }
  
        async function getSomeData(id) {
          const nestedStorage = new AsyncLocalStorage()
          return nestedStorage.run('nested-' + id, async () => {
            try {
              const response = await fetch('https://example.vercel.sh')
              await response.text()
            } finally {
              return { nestedId: nestedStorage.getStore() }
            }
          })
        }
      `,
			expectResponse: (response, id) =>
				expect(response).toMatchObject({
					json: { id: id, nestedId: `nested-${id}` },
					status: 200,
				}),
			title: 'multiple instances',
		},
	];

	afterEach(() => next.destroy());

	it.each(cases)(
		'cans use $title per request',
		async ({ code, expectResponse }) => {
			next = await createNext({
				files: {
					'pages/api/async.js': code,
					'pages/index.js': `
            export default function () { return <div>Hello, world!</div> }
          `,
				},
			});
			const ids = Array.from({ length: 100 }, (_, i) => `req-${i}`);

			const responses = await Promise.all(
				ids.map((id) =>
					fetchViaHTTP(
						next.url,
						'/api/async',
						{},
						{ headers: { 'req-id': id } },
					).then((response) =>
						response.headers.get('content-type')?.startsWith('application/json')
							? response.json().then((json) => ({
									json,
									status: response.status,
									text: null,
								}))
							: response.text().then((text) => ({
									json: null,
									status: response.status,
									text,
								})),
					),
				),
			);
			const rankById = new Map(ids.map((id, rank) => [id, rank]));

			const errors: Error[] = [];
			for (const [rank, response] of responses.entries()) {
				try {
					expectResponse(response, ids[rank]);
				} catch (error) {
					const received = response.json?.id;
					console.log(
						`response #${rank} has id from request #${rankById.get(received)}`,
					);
					errors.push(error as Error);
				}
			}
			if (errors.length) {
				throw errors[0];
			}
		},
	);
});
