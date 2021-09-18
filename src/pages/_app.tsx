import { AppProps } from 'next/app';
import '../../styles/globals.scss';
import { Header } from '../components/header/index.';
import {Provider as  NextProvider} from 'next-auth/client';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NextProvider session={pageProps.session}>
      <Header />
      <Component {...pageProps} />
    </NextProvider>
  );
}

export default MyApp;
