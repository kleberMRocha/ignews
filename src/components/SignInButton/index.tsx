import React from 'react';
import {signIn, signOut, useSession} from 'next-auth/client';
import { useState } from 'react';
import { FaGithub } from 'react-icons/fa';
import { FiXCircle } from 'react-icons/fi';
import styles from './style.module.scss';

export const SignInButton: React.FC = () => {
  const [session] = useSession();
  console.log(session);
  return (
    <button onClick={session ? () => {} : () => signIn('github')} className={styles.signInButton}>
      <FaGithub color={session ? '#04D361' : '#eda417'} />
      {session ? session.user.name : 'Sing in with GitHub'}
      {session && 
      (
       <button className={styles.btnSignOut} type="button" onClick={() => signOut()}> 
        <FiXCircle className={styles.close} color="#e1e1e6" />
       </button>
      )
     
      }
    </button>
  );
};
