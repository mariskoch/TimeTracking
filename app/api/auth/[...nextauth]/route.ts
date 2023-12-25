import NextAuth from 'next-auth';
import {options} from "@/app/api/auth/[...nextauth]/options";

declare module "next-auth" {
    interface Session {
        user: {
            id: string,
            firstName: string,
            lastName: string,
            email: string,
        }
    }

    interface User {
        id: string,
        firstName: string,
        lastName: string,
        email: string,
        password: string,
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        id: string,
        firstName: string,
        lastName: string,
        email: string,
    }
}

const handler = NextAuth(options);

export {handler as GET, handler as POST};
