/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

import { ApiResponse } from "@/types";
import request from "@/utils/axiosClient";

export const Options: NextAuthOptions = {
  pages: {
    signIn: "/login",
    error: "/login",
  },
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: "Email", type: "text", placeholder: "Email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };
        const response: ApiResponse = await request.post("/auth/login", {
          email,
          password,
        });

        if (response.statusCode === 200) {
          return {
            ...response.data,
          };
        }
        if (response.statusCode === 404) {
          throw new Error("User not found!");
        }
        if (response.statusCode === 401) {
          throw new Error("Wrong password!");
        }
        throw new Error("Internal Server Error!");
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET as string,
  },
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ token, session }) {
      session = token as any;
      return session;
    },
  },
};

export const handler = NextAuth(Options);

export { handler as GET, handler as POST };
