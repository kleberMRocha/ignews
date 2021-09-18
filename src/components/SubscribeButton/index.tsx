import React from 'react';
import styles from './style.module.scss';

interface ISubProps {
  priceId: string;
}

export const SubButton: React.FC<ISubProps> = ({ priceId }) => {
  return <button className={styles.subscribeButton}>Subscribe now</button>;
};
