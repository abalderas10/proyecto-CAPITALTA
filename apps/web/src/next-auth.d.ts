import NextAuth, { DefaultSession } from "next-auth"

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    accessToken?: string
    user: {
      id: string
      rol: string
    } & DefaultSession["user"]
  }

  interface User {
    rol: string
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string
    rol: string
    backendToken?: string
  }
}
