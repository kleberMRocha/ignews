import {useSession, signIn} from 'next-auth/client';
import {api} from '../../services/axios';
import React from 'react';
import styles from './style.module.scss';
import { getStripeJs } from '../../services/stripe.js';

interface ISubProps {
  priceId: string;
}

export const SubButton: React.FC<ISubProps> = ({ priceId }) => {
const [session] =  useSession();

const handleSubscribe = async () => {
  if(!session){
    signIn('github');
    return;
  } 
 
  try {
   const response = await api.post(`subscribe/${priceId}`);
   const { customer_id } =  response.data;

   const stripe = await getStripeJs();

   await stripe.redirectToCheckout({sessionId: customer_id});

  } catch (error) {
    console.log(error);
    
  }
  // todo criar checkout 
};

  return <button  onClick={() => handleSubscribe()} className={styles.subscribeButton}>Subscribe now</button>;
};
