import {NextApiRequest,NextApiResponse, } from 'next';
import { stripe } from '../../../services/stripe';
import {getSession} from 'next-auth/client';
import { fauna } from '../../../services/fauna';
import {query as q} from 'faunadb';

type IUser = {
  ref:{
    id: string;
  },
  data:{
    stripe_customer_id: string;
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  const {id} = req.query;
  const session = await getSession({req});

  const user = await fauna.query<IUser>(
    q.Get(q.Match(
      q.Index('by_email'),
      q.Casefold(session.user.email),
    ))
  );


  let customerStripeId = user.data.stripe_customer_id || null;

  if(!customerStripeId){

  const stripeCostumer = await stripe.customers.create({
    email: session.user.email,
  });

    await fauna.query(
      q.Update(
        q.Ref(q.Collection('users'),user.ref.id),
        {
          data: {
            stripe_customer_id: stripeCostumer.id,
          }
        }
      )
    );

    customerStripeId = stripeCostumer.id;
  }

  if(req.method === 'POST'){
    const checkoutSession = await stripe.checkout.sessions.create({
      customer: customerStripeId,
      payment_method_types:['card'],
      billing_address_collection: 'required',
      line_items: [{price: String(id), quantity: 1}],
      mode:'subscription',
      allow_promotion_codes: true,
      success_url: '/posts',
      cancel_url: '/'
    });
    return res.status(200).json({
      customer_id: checkoutSession.id
    });
  }

  res.setHeader('Allow', 'POST');
  res.status(405).end('Method not allowed');
 
}
