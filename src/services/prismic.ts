import Prismic from '@prismicio/client';

export const  getPrismicClient  =  (req?: unknown) => {
    const prismic = Prismic.client(process.env.PRISMIC_URL,{
        req,
        accessToken:process.env.PRISMIC_PRIVATE_KEY
    });

    return prismic;
};

export default getPrismicClient;