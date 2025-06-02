import { createGetServerSideProps, Page } from '../../../components/page';

export default Page;

export const getServerSideProps = createGetServerSideProps('/[slug]/about');
