import bcrypt from 'bcrypt';
import { User } from '@/app/models/user';
import dbConnect from '../../../lib/dbConnect'
import jwt from "jsonwebtoken"

interface loginData {
    username: string,
    password: string
}

export async function POST(request: Request) {
    try {
        await dbConnect();
        const data = await request.json();
        if ( !data.username || !data.password)
            return Response.json({message: "invalid input"}, { status: 400}) 
        
        const dbUser = await User.findOne({username: data.username})
        
        if (!dbUser)
            return Response.json({message: "User doesnt exist"}, { status: 400}) 
        
        if (!(await bcrypt.compare(data.password , dbUser.password as string)))
            return Response.json({message: "incorect password"}, { status: 400}) 
        
        const newToken = jwt.sign({username: dbUser.username, loginTime: Date.now() }, process.env.CRYPTO_SECRET as string)

        return Response.json({status: 'success', received: {token: newToken}})
        
    } catch (error) {
        return Response.json({status: 'failed', received: error})
    }

}