import {NextAuthOptions} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const options: NextAuthOptions = {
    callbacks: {
        jwt({token, user}) {
            if (user) {
                token.id = user.id;
                token.name = user.name;
                token.email = user.email;
            }
            return token;
        },
        session({session, token}) {
            if (token) {
                session.user.id = token.id;
                session.user.name = token.name;
                session.user.email = token.email;
            }
            return session;
        }
    },
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
