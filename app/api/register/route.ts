import {prisma} from "@/client";
import bcrypt from 'bcrypt';

export async function POST(request: Request) {
    try {
        const body = await request.json();

        if (!body.email || !body.password || !body.firstName || !body.lastName) {
            return Response.json({error: 'Missing required fields. Required fields are: email, password, firstName, lastName'}, {status: 400});
        }

        const dbUser = await prisma.user.findUnique({
            where: {
                email: body.email
            }
        });

        if (dbUser) return Response.json({conflict: 'There is already an account with the email address ' + body.email}, {status: 409});

        const hash = bcrypt.hashSync(body.password, 10);

        if (hash) {
            const newUser = await prisma.user.create({
                data: {
                    email: body.email,
                    firstName: body.firstName,
                    lastName: body.lastName,
                    password: hash,
                }
            });
            console.log(`Created new user ${newUser.id}`);
            return Response.json({id: newUser.id}, {status: 201});
        } else {
            console.warn(`An error occurred when hashing a password!`);
            return Response.json({error: `An error occurred, please try again later`}, {status: 500});
        }
    } catch (err) {
        console.log('Something went wrong when registering a user')
        return Response.json({error: `An error occurred, please try again later`}, {status: 500});
    }
}
