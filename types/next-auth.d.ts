import NextAuth from "next-auth";
import { UserRole } from "./enum";

declare module "next-auth" {
  interface Session {
    info: {
      fullName: string;
      email: string;
      birthDay: string;
      role: UserRole;
      createdAt: string;
      updatedAt: string;
      _id: string;
    };
    token: string;
  }
}
