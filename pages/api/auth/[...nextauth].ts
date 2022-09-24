import NextAuth, { NextAuthOptions } from "next-auth";
import CrendentialsProvider from "next-auth/providers/credentials";

const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CrendentialsProvider({
      type: "credentials",
      credentials: {},
      authorize(credentials, req) {
        const {username, email, password} = credentials as {email: string, username: string, password: string}
        return {}
      }
    }),
  ],
};

export default NextAuth(authOptions);
