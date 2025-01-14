 import NextAuth from "next-auth/next";

import { Options } from "@/utils/auth";

const handler = NextAuth(Options);

export { handler as GET, handler as POST };
