import React from 'react';
import Image from 'next/image';
import styles from './style.module.scss';
import { SignInButton } from '../../components/SignInButton/index';
import Link from 'next/link';
import { useRouter } from 'next/dist/client/router';

export const Header: React.FC = () => {

  const { asPath } = useRouter();

  const getActiveLink = (path:string, asPath:string) => {
   let slug = (asPath.slice(0,6));
   return path ===  slug  ? styles.active : '';
  };

  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <Link href={'/'} >
        <a href="#">
          <img src="/images/logo.svg" alt="Logo"  className="logo"  />
        </a>
        </Link>
        <nav>
          <Link href={'/'} >
          <a  href="#" className={getActiveLink('/', asPath)}>
              Home
          </a>
          </Link>
          <Link href={'/posts'}>
           <a href="#" className={getActiveLink('/posts', asPath)}> 
              Posts
          </a>
          </Link>
        </nav>
        <div className={styles.signInButtonContainer}>
          <SignInButton />
        </div>
      </div>
    </header>
  );
};
