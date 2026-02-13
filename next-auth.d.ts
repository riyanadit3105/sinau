import NextAuth, { DefaultSession } from "next-auth"
import { JWT } from "next-auth/jwt"

declare module "next-auth" {
  /**
   * Memperluas tipe User (yang keluar dari authorize)
   */
  interface User {
    id: string
    role: string
    sessionVersion: string
  }

  /**
   * Memperluas tipe Session (yang dipakai di frontend useSession)
   */
  interface Session {
    user: {
      id: string
      role: string
      sessionVersion: string
    } & DefaultSession["user"]
  }
}

declare module "next-auth/jwt" {
  /**
   * Memperluas tipe Token JWT
   */
  interface JWT {
    id: string
    role: string
    sessionVersion: string
  }
}