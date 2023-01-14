import NextAuth, { type NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";

// Prisma adapter for NextAuth, optional and can be removed
import { PrismaAdapter } from "@next-auth/prisma-adapter";

import { env } from "../../../env/server.mjs";
import { prisma } from "../../../server/db";
// import { loginSchema } from "../../../lib/schemas.js";
import { verify } from "argon2";

import { z } from "zod";
const loginSchema = z.object({
  email: z.string().email("you must use a valid email"),
  password: z
    .string()
    .min(6, "please your password must contains more than 6 characters"),
});

export const authOptions: NextAuthOptions = {
  // Include user.id on session
  callbacks: {
    session({ session, user, token }) {
      if (session.user) {
        session.user.id = user.id;
      }
      return session;
    },
    jwt: async ({ token, user }) => {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },
  },
  // Configure one or more authentication providers
  adapter: PrismaAdapter(prisma),
  providers: [
    // GithubProvider({
    //   clientId: env.GITHUB_CLIENT_ID,
    //   clientSecret: env.GITHUB_CLIENT_SECRET,
    // }),
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
      httpOptions: {
        timeout: 15000,
      },
    }),
    CredentialsProvider({
      name: "credetials",
      credentials: {
        email: {
          label: "Email",
          placeholder: "Enter your email",
          type: "email",
        },

        password: {
          label: "Password",
          placeholder: "Enter your password",
          type: "password",
        },
      },
      authorize: async (credentials, request) => {
        const creds = await loginSchema.parseAsync(credentials);
        const user = await prisma.user.findFirst({
          where: {
            email: creds.email,
          },
        });
        if (!user || user.password == "") return null;
        const valid = await verify(user.password, creds.password);
        if (!valid) return null;
        return { id: user.id, email: user.email, name: user.name };
      },
    }),
  ],
  jwt: {
    secret: env.NEXTAUTH_SECRET,
    maxAge: 15 * 24 * 30 * 60,
  },
  pages: {
    signIn: "/login",
    newUser: "/register",
  },
};

export default NextAuth(authOptions);
