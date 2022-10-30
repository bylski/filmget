import NextAuth, { Awaitable, NextAuthOptions, User } from "next-auth";
import CrendentialsProvider from "next-auth/providers/credentials";
import { User as mongoUser } from "../../../utils/mongo/userModel";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { Session } from "next-auth";
import { JWT } from "next-auth/jwt";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async session(params: {session: Session, user: User, token: JWT}) {
      const {session, user, token} = params;

      try {
        // Check if code runs in production or in development, use the address specified for environment
        // Connect to the database
        if (process.env.NODE_ENV === "production") {
          await mongoose.connect(process.env.DB_ADDRESS!, { dbName: "filmget" });
        } else {
          await mongoose.connect("mongodb://localhost:27017/filmget");
        }
      } catch (error) {
        throw new Error("[ERROR] Couldnt' connect to the database!");
      }

      const currentUser = await mongoUser.findOne({username: session.user?.name});
      if (currentUser.avatarSrc !== session.user?.image) {
        session.user = {...session.user, image: currentUser.avatarSrc.url || null}
      }

      return session;
    }
  },
  pages: { signIn: "/login" },
  providers: [
    CrendentialsProvider({
      type: "credentials",
      credentials: {},
      async authorize(credentials, req) {
        const { username, password } = credentials as {
          username: string;
          password: string;
        };

        // Connect to the db
        if (process.env.NODE_ENV === "production") {
          await mongoose.connect(process.env.DB_ADDRESS!, {
            dbName: "filmget",
          });
        } else {
          await mongoose.connect("mongodb://localhost:27017/filmget");
        }
        // Check if user with such username exists
        const existingUser = await mongoUser.findOne({ username: username });
        if (existingUser !== null) {
          const isPasswordMatching = await bcrypt.compare(
            password,
            existingUser.password
          );

          const avatarSrc = existingUser.avatarSrc.url;

          if (isPasswordMatching) {
            return {
              image: avatarSrc,
              name: username,
              email: existingUser.email || "",
            };
          }
        }
        return null;
      },
    }),
  ],
};

export default NextAuth(authOptions);
