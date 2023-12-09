import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcrypt"
import NextAuth, { AuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { PrismaAdapter } from "@next-auth/prisma-adapter"

import prisma from "@/app/libs/prismadb"

export const authOptions: AuthOptions = {
  // Use Prisma as the adapter for session storage
  adapter: PrismaAdapter(prisma),

  // Configure authentication providers
  providers: [
    // Google authentication provider
    GoogleProvider({
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
      clientId: process.env.GOOGLE_CLIENT_ID as string,
    }),

    // Credentials authentication provider (custom email/password)
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'email', type: 'text' },
        password: { label: 'password', type: 'password' }
      },
      // Authorize function for custom credentials authentication
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Invalid credentials');
        }

        // Find user in the database based on the provided email
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email
          }
        });

        // Check if user or hashedPassword is not available
        if (!user || !user?.hashedPassword) {
          throw new Error('Invalid credentials');
        }

        // Compare provided password with stored hashedPassword
        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        );

        // If password is incorrect, throw an error
        if (!isCorrectPassword) {
          throw new Error('Invalid credentials.Try again');
        }
        return user;
      }
    })
  ],

  pages: {
    signIn: '/', // Redirect to the home page for sign-in
  },

  debug: process.env.NODE_ENV === 'development',

  // Configure session strategy
  session: {
    strategy: "jwt", // Use JWT for session strategy
  },

  // Set the secret for session encryption
  secret: process.env.NEXTAUTH_SECRET,
}

export default NextAuth(authOptions);
