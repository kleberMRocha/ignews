import Head from 'next/head';
import { SubButton } from '../components/SubscribeButton/index';
import styles from '../../styles/Home.module.scss';
import { GetServerSideProps } from 'next';
import { stripe } from '../services/stripe';

interface IHomeProps {
  product: {
    priceId: string;
    amount: number;
  };
}

export default function Home({ product }: IHomeProps) {

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
            <span>for {product.amount} month</span>
          </p>
          <SubButton priceId={product.priceId} />
        </section>
        <img src="/images/avatar.svg" alt="girl codding" />
      </main>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const price = await stripe.prices.retrieve('price_1JZ2ZgFsDMcpyl3rlVYlYEAH', {
    expand: ['product'],
  });

  const product = {
    priceId: price.id,
    amount: new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price.unit_amount / 100),
  };

  return {
    props: {
      product,
    },
  };
};
