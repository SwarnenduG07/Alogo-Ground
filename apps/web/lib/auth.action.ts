import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { dbCLient } from "@/src/app/db";
export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
              username: {
                label: "email",
                type: "text",
                placeholder: "name@gmail.com",
              },
              password: {
                label: "password",
                type: "password",
                placeholder: "********",
              },

              async authorize(credentials: any) {
                   if (!credentials.username || !credentials.password) {
                          return null;
                   }
                   const hashedPassword = await bcrypt.hash(credentials.password, 10);
                   const user = await dbCLient.user.upsert({
                    where: {
                      email: credentials.username,
                    },
                    update: {},
                    create: {
                      email: credentials.username,
                      name: credentials.username,
                      password: credentials.password, 
                     };
                   });
                }
            },
        })
    ]
}