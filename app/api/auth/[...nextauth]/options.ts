import {NextAuthOptions} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const options: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            id: "credentials",
            name: "Credentials",
            credentials: {
                username: {label: "Username", type: "text", placeholder: "john_doe"},
                password: {label: "Password", type: "password"},
            },
            async authorize(credentials) {
                return {
                    id: "1",
                    name: "Test User",
                    email: "test@test.de",
                }
            }
        })
    ]
}
