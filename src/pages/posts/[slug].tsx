import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/client';
import React from 'react';
import getPrismicClient from '../../services/prismic';
import style from './style.module.scss';

import { RichText } from 'prismic-dom';
import Link from 'next/link';

import { FiArrowLeft } from 'react-icons/fi';
import { redirect } from 'next/dist/server/api-utils';

interface Post {
  slug: string;
  title: string;
  content: string;
  updatedAt: string;
}

const Post: React.FC<Post> = ( post ) => {
  const {slug,title,updatedAt,content} = post;
  
  return (
    <section className={style.postSection}>
        <Link href="/posts">
            <a href="#">
                <FiArrowLeft />
                Voltar
            </a>
        </Link>
      
      <h1>{title} | Ignews </h1>
      <small>{updatedAt}</small>
      <main>
          <article dangerouslySetInnerHTML={{__html:content}}>
          </article>
      </main>
    </section>
  );
};

export default Post;

export const getServerSideProps: GetServerSideProps = async ({
  req,
  params,
}) => {

  const session = await getSession({ req });

  const Prismic = getPrismicClient(req);

  const reponse = await Prismic.getByUID('post', String(params.slug), {});
  
  if(session && !session.activeSubscription){
    return {redirect:{ destination: '/', permanent: false} }
  }
   
  const post = {
    slug: reponse.uid,
    title: RichText.asText(reponse.data.title),
    content: RichText.asHtml(reponse.data.content),
    updatedAt: new Date(reponse.last_publication_date).toLocaleDateString(
      'pt-BR',
      {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      }
    ),
  };

  return { props:  post  };
};
