import prismadb from '@/lib/prisma';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { compare } from 'bcrypt';
import nextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
    Credentials({
      id: 'credentials',
      name: 'Credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'text',
        },
        password: {
          label: 'Password',
          type: 'passord'
        }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Email and password required');
        }

        const user = await prismadb.user.findUnique({ where: {
          email: credentials.email
        }});

        if (!user || !user.hashedPassword) {
          throw new Error('Email does not exist');
        }

        const isCorrectPassword = await compare(credentials.password, user.hashedPassword);

        if (!isCorrectPassword) {
          throw new Error('Incorrect password');
        }
        // console.log(user)
        return user;
      }
    })
  ],
  pages: {
    signIn: '/auth'
  },
  debug: process.env.NODE_ENV === 'development',
  adapter: PrismaAdapter(prismadb),
  session: { strategy: 'jwt' },
  // callbacks: {
  //   session: async (session) => {
  //     // Fetch user roles from your database and add them to the session
  //     const role = await fetchUserRole(session.session.user.email);
  //     session.session.user.role = role;
  //     // console.log(session)
  //     return Promise.resolve(session);
  //     // return session
  //   },
  // },
  
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ user , token }) {
      
      if (user) {  // Note that this if condition is needed
        token.user={...user}
      }
      return token
     },
    async session({ session, token }) {
      if (token?.user) { // Note that this if condition is needed
        session.user = token.user;
      }
      return session
    },
  },
};
const handler = nextAuth(authOptions)
export { handler as GET, handler as POST };

async function fetchUserRole(email) {

  const query = await prismadb.user.findUnique({
    where: {
      email: email
    },
  });


  return query.role

}