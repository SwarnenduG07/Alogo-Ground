import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import z from "zod";
import { dbCLient } from "@/src/app/db";
import { NextAuthOptions, User } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { JWT } from "next-auth/jwt";
import { Session } from "next-auth";

declare module "next-auth" {

interface Session {
  user: {
     role: string;
      
  } & User
}
interface User {
  role: string;
 }
}



const passwordSchema = z.string().min(6).max(50).refine(
  (val) => /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*(),.?":{}|<>]).{6,50}$/.test(val),
  {
      message: "Password must contain at least one uppercase letter, one number, and one special character"
  }
);

// Validation schema for sign-up
const signUpSchema = z.object({
  email: z.string().email(),
  username: z.string().min(3).max(30),
  firstname: z.string().min(3).max(30),
  lastname: z.string().min(2).max(30),
  password: passwordSchema
});

// Validation schema for sign-in
const signInSchema = z.object({
  email: z.string().email(),
  password: passwordSchema,
});

export const authOptions:NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        firstname: { label: "First Name", type: "text", placeholder: "John" },
        lastname: { label: "Last Name", type: "text", placeholder: "Doe" },
        username: { label: "Username", type: "text", placeholder: "username" },
        email: { label: "Email", type: "text", placeholder: "johndoe@gmail.com" },
        password: { label: "Password", type: "password", required: true },
      },
      async authorize(credentials: any) {
        // Check if it's sign-in (only email and password)
        if (!credentials.firstname && !credentials.lastname && !credentials.username) {
          try {
            signInSchema.parse({
              email: credentials.email,
              password: credentials.password,
            });
          } catch (e) {
            console.error("Validation error: ", e);
            throw new Error("Invalid credentials");
          }

          const existingUser = await dbCLient.user.findFirst({
            where: { email: credentials.email },
          });

          if (existingUser) {
            const passwordValidation = await bcrypt.compare(credentials.password, existingUser.password);
            if (passwordValidation) {
              return { 
                id: existingUser.id.toString(), 
                email: existingUser.email ,
                role: existingUser.role,
              };
            }
            throw new Error("Invalid email or password");
          }
          throw new Error("User not found");
        }

        try {
          signUpSchema.parse({
            email: credentials.email,
            username: credentials.username,
            firstname: credentials.firstname,
            lastname: credentials.lastname,
            password: credentials.password,
          });
        } catch (e) {
          console.error("Validation error: ", e);
          throw new Error("Invalid credentials");
        }

        const existingUser = await dbCLient.user.findFirst({
          where: { email: credentials.email },
        });

        if (existingUser) {
          throw new Error("User already exists");
        }

        const hashedPassword = await bcrypt.hash(credentials.password, 10);
        const user = await dbCLient.user.create({
          data: {
            email: credentials.email,
            username: credentials.username,
            password: hashedPassword,
            firstname: credentials.firstname,
            lastname: credentials.lastname,
          },
        });

        return {
           id: user.id.toString(), 
          email: user.email,
          role: user.role,
        };
      },
    }),
     GithubProvider({
       clientId: process.env.GITHUB_ID || "",
       clientSecret: process.env.GITHUB_SECRET || "",
    })
  ],
  session: {
    strategy: "jwt",
  },
  jwt: {
    secret: process.env.JWT_SECRET || "your_secret_key",
  },
  callbacks: {
    async jwt({ token, user }: { token: JWT; user: any }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.role = user.role;

      }
      return token;
    },
    async session({ session, token }: { session: any; token: JWT }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.emailz = token.role as string;
      }
      return session;
    },
    async redirect({ url, baseUrl }: { url: string; baseUrl: string }) {
      if (url === '/signin') {
        return `${baseUrl}/contests`;  
      }
      return `${baseUrl}/contests`;  
    },
  },
  pages: {
    signIn: "/signin",
    signOut: "/", 
  },
};
