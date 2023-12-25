import {NextAuthOptions} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import {prisma} from "@/client";
import bcrypt from "bcrypt";

export const options: NextAuthOptions = {
    pages: {
        signIn: "/login",
    },
    callbacks: {
        jwt({token, user}) {
            if (user) {
                token.id = user.id;
                token.firstName = user.firstName;
                token.lastName = user.lastName;
                token.email = user.email;
            }
            return token;
        },
        session({session, token}) {
            if (token) {
                session.user.id = token.id;
                session.user.firstName = token.firstName;
                session.user.lastName = token.lastName;
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
                email: {label: "E-Mail", type: "text", placeholder: "test@example.com"},
                password: {label: "Password", type: "password"},
            },
            async authorize(credentials) {
                if (!credentials?.password || !credentials.email) return null;

                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials.email
                    }
                });

                if (!user) return null;

                const allowLogin = await bcrypt.compare(credentials.password, user.password);

                if (!allowLogin) {
                    console.log(`Invalid login try for user ${user.id}`);
                    return null;
                } else {
                    console.log(`User ${user.id} logged in`);
                    return user;
                }
            }
        })
    ]
}
