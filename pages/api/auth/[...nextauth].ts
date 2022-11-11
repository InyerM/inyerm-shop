import NextAuth, { NextAuthOptions, Session, User } from "next-auth"
import GithubProvider from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials"
import { JWT } from "next-auth/jwt"
import { dbUsers } from "../../../database"

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "example@gmail.com" },
        password: { label: "Password", type: "password", placeholder: 'Password' },
      },
      async authorize(credentials): Promise<any> {

        return await dbUsers.checkUserEmailPassword( credentials?.email || '', credentials?.password || '' )
      },
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
  ],
  pages: {
    signIn: "/auth/login",
    newUser: "/auth/register",
  },
  jwt: {
  },
  session: {
    maxAge: 2592000,
    strategy: 'jwt',
    updateAge: 86400,
  },
  callbacks: {
    async jwt({ token, account, user }) {

      if (account) {
        token.accessToken = account.access_token

        switch ( account.type ) {
          case 'credentials':
            token.user = user
            break

          case 'oauth':
            await dbUsers.OAuthToDbUser( user?.email || '', user?.name || '' )
            break
        }
      }

      return token
    },
    async session({ session, token, user }: { session: any, token: JWT, user: User }) {
      session.accessToken = token.accessToken
      session.user = token.user as any
      return session
    },
  }
}

export default NextAuth(authOptions)