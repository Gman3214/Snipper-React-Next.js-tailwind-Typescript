import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import dbConnect from '@/app/lib/dbConnect';
import { User } from '@/app/models/user';

interface registerData {
    email: string
    username: string
    password: string
    firstjoined : number
}

export async function POST(request: Request) {
    try {
        await dbConnect();
        const data : registerData = await request.json();

        data.firstjoined = Date.now()
        
        if (!data.email || !data.username || !data.password)
            return Response.json({message: "please provide email, username and password"}, {status: 400})

        const hashedPassword = await bcrypt.hash(data.password, 10);

        const result = await User.create(
            {
            email: data.email,
            username: data.username,
            password: hashedPassword,
            firstjoined: Date.now()
        });

        const newToken = await jwt.sign({username: data.username, loginTime: data.firstjoined}, process.env.CRYPTO_SECRET as string);
        
        return Response.json({status: 'success', received: {token: newToken}})

    } catch (error) {
        return Response.json({status: 'failed', received: error})
    }
}
