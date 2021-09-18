import NextAuth from "next-auth";
import Provider from "next-auth/providers";

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    Provider.GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      scope:'read:user'
    }),
  ],
})