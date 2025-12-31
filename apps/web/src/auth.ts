import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        
        try {
          const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'https://api.capitalta.abdev.click';
          const res = await fetch(`${backendUrl}/auth/login`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password
            })
          });

          const data = await res.json();

          if (!res.ok || !data) {
            console.error('Error en login backend:', data);
            return null;
          }

          // Asumiendo que el backend devuelve { token, user: { ... } }
          // Si devuelve directamente el usuario con token incluido, ajustar aquí.
          // Mapeamos a la estructura de User de NextAuth
          return {
            id: data.user?.id || 'unknown',
            name: data.user?.nombre,
            email: data.user?.email,
            rol: data.user?.rol,
            organizacionId: data.user?.organizacionId,
            accessToken: data.token // Guardamos el token para usarlo en la sesión
          };
        } catch (error) {
          console.error('Error de conexión con backend:', error);
          return null;
        }
      }
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.rol = (user as any).rol;
        token.organizacionId = (user as any).organizacionId;
        token.accessToken = (user as any).accessToken;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.rol = token.rol as any;
        session.user.organizacionId = token.organizacionId as string | undefined;
        // Exponemos el token en la sesión para que el cliente lo pueda usar
        (session as any).accessToken = token.accessToken;
      }
      return session;
    }
  },
  pages: {
    signIn: '/login',
  },
  secret: process.env.NEXTAUTH_SECRET,
};
