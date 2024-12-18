import NextAuth, { DefaultSession } from "next-auth"
import authConfig from "./auth.config"

declare module "next-auth" {
  interface Session {
    user: {
      firstName: string
      department: string
    } & DefaultSession["user"]
  }

  interface User {
    firstName: string
    department: string
  }
}
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  session: {
    strategy: "jwt"
  },
  secret: process.env.JWT_SECRET,
  ...authConfig
})