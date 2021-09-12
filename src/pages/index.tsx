import Head from 'next/head';
import styles from '../../styles/Home.module.scss';

export default function Home() {
  return (
    <div>
      <Head>
        <title>IGnews</title>
      </Head>
      <main className={styles.container}>
        <section className={styles.hero}>
          <span> 👏, Hey, welcome</span>
          <h1>
            News about the <span>React</span> world
          </h1>
          <p>
            Get acess to all the publications
            <br />
            <span>for $9.90 month</span>
          </p>
          <button>Subscribe now</button>
        </section>

        <img src="/images/avatar.svg" alt="girl codding" />
      </main>
    </div>
  );
}
