import NextAuth from 'next-auth';
import {options} from "@/app/api/auth/[...nextauth]/options";

/*
declare module "next-auth" {
    interface Session {

    }

    interface User {
        id: string;
        name: string;
        email: string;
        address: string;
    }

    interface Account {

    }
}
*/

const handler = NextAuth(options);

export {handler as GET, handler as POST};
