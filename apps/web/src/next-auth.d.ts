import 'next-auth'
import 'next-auth/jwt'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      email: string
      name: string
      rol: string
      organizacionId?: string
    }
    accessToken: string
  }

  interface User {
    id: string
    email: string
    name: string
    rol: string
    accessToken: string
    organizacionId?: string
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string
    rol: string
    accessToken: string
    organizacionId?: string
  }
}
