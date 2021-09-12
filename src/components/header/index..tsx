import React from 'react';
import Image from 'next/image';
import styles from './style.module.scss';
import { SignInButton } from '../../components/SignInButton/index';

export const Header: React.FC = () => {
  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <Image src="/images/logo.svg" alt="Logo" width="100" height="50" />
        <nav>
          <a className={styles.active}>Home</a>
          <a>Posts</a>
        </nav>
        <div className={styles.signInButtonContainer}>
          <SignInButton />
        </div>
      </div>
    </header>
  );
};
