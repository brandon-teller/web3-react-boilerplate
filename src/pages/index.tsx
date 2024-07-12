import Head from 'next/head';

import { Landing } from '@/containers';

const Home = () => {
  return (
    <>
      <Head>
        <title>Wonderland Challenge</title>
      </Head>
      <Landing />
    </>
  );
};

export default Home;
