import { Providers } from '@/providers';
import type { AppProps } from 'next/app';
import Layout from './layout';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Providers>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Providers>
  );
}
