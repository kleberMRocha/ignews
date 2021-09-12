import React from 'react';
import { useState } from 'react';
import { FaGithub } from 'react-icons/fa';
import { FiXCircle } from 'react-icons/fi';
import styles from './style.module.scss';

export const SignInButton: React.FC = () => {
  const [isUserLogged, setLogged] = useState(true);
  return (
    <button className={styles.signInButton}>
      <FaGithub color={isUserLogged ? '#04D361' : '#eda417'} />
      {isUserLogged ? 'kleber Rocha' : 'Sing in with GitHub'}
      {isUserLogged && <FiXCircle className={styles.close} color="#e1e1e6" />}
    </button>
  );
};
