import type { GetServerSideProps } from 'next';

type Props = {
	data: string;
};

export const getServerSideProps: GetServerSideProps<Props> = async (
	_context,
) => {
	return {
		props: (async () => ({ data: 'some data' }))(),
	};
};

export default function Page({ data }: Props) {
	return <h1> {data} </h1>;
}
