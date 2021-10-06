import NextAuth from "next-auth";
import Provider from "next-auth/providers";
import { fauna } from '../../../services/fauna';
import {query as q} from 'faunadb';


export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    Provider.GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      scope:'read:user'
    }),
  ],
  callbacks:{
    async session(session){
      try {
        const userActiveSubscription = await fauna.query(
          q.Get(
            q.Intersection([
              q.Match(
                q.Index('subscription_by_user_ref'),
                q.Select(
                  "ref",
                  q.Get(
                    q.Match(
                      q.Index('by_email'),
                      q.Casefold(session.user.email)
                    )
                  )
                )
              ),
              q.Match(
                q.Index('subscription_by_status'),
                "active"
              )
            ])
          )
        )

        return {
          ...session,
          activeSubscription: userActiveSubscription
        }
      } catch {
        return {
          ...session,
          activeSubscription: false,
        }
      }
    },
    async signIn(user) {
      const { email } = user;
      try {

        await  fauna.query(
          q.If(
            q.Not(
              q.Exists(
                q.Match(
                  q.Index('by_email'),
                  q.Casefold(email)
                )
              )
            ),
            q.Create(
              q.Collection('users'),
              { data: { email } }
            ),
            q.Get(
              q.Match(
                q.Index('by_email'),
                q.Casefold(email)
              )
            )
          )
        )

        return true;

      } catch (error) {
        console.log('Hove um erro ao conectar com o banco de dados')
        return false;
        
      }
  
    
    },
  }
})