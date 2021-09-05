import Head from 'next/head';
import styles from '../../styles/Home.module.scss';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>IGnews</title>
      </Head>
      <div>
        <h1>Hello Word</h1>
      </div>
    </div>
  );
}
