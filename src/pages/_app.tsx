import { AppProps } from 'next/app';
import '../../styles/globals.scss';
import { Header } from '../components/header/index.';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Header />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
