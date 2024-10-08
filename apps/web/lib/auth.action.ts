import CredentialsProvider from "next-auth/providers/credentials";

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
            },
        })
    ]
}