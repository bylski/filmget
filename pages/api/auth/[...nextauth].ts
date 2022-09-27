import NextAuth, { NextAuthOptions } from "next-auth";
import CrendentialsProvider from "next-auth/providers/credentials";
import { User } from "../../../utils/mongo/userModel";
import mongoose from "mongoose";
import bcrypt from "bcrypt";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
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
        const existingUser = await User.findOne({ username: username });
        if (existingUser !== null) {
          const isPasswordMatching = await bcrypt.compare(
            password,
            existingUser.password
          );
          if (isPasswordMatching) {
            console.log("Welcome!");
            return { name: username, email: existingUser.email || null };
          }
        }

        console.log("Invalid credentials");
        return null;
      },
    }),
  ],
};

export default NextAuth(authOptions);
