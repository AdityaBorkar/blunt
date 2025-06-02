import dynamic from 'next/dynamic';

const Hello = dynamic(import('../../components/hello1'), {
	loading: () => <p>LOADING</p>,
	ssr: false,
});

export default Hello;
