import type { GetServerSideProps } from 'next';

type Props = {
	data: string;
	cookies: any;
};

export const getServerSideProps: GetServerSideProps<Props> = async ({
	req,
}) => {
	return {
		props: { cookies: req.cookies, data: 'hello world' },
	};
};

export default function Page({ cookies }: Props) {
	return <pre id="cookies">{JSON.stringify(cookies)}</pre>;
}
