import { expectTypeOf } from 'expect-type';
import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next';

describe('InferGetServerSidePropsType', () => {
	it('should work with sync functions', async () => {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		function getStaticProps(context: GetStaticPropsContext) {
			if (context.params?.notFound) {
				return {
					notFound: true,
				};
			}

			return {
				props: {
					foo: 'bar',
				},
			};
		}

		type PageProps = InferGetStaticPropsType<typeof getStaticProps>;

		expectTypeOf<PageProps>().toEqualTypeOf<{ foo: string }>();
	});

	it('should work with async functions', async () => {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		async function getStaticProps(context: GetStaticPropsContext) {
			if (context.params?.notFound) {
				return {
					notFound: true,
				};
			}

			if (context.params?.redirect) {
				return {
					redirect: {
						destination: '/',
					},
				};
			}

			return {
				props: {
					foo: 'bar',
				},
			};
		}

		type PageProps = InferGetStaticPropsType<typeof getStaticProps>;

		expectTypeOf<PageProps>().toEqualTypeOf<{ foo: string }>();
	});
});
