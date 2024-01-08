import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import dbConnect from '@/app/lib/dbConnect';
import { User } from '@/app/models/user';
import { AuthCheck } from '../../middleware';


export async function POST(request: Request) {
    try {
        
        const tokenData = await AuthCheck(request);
        const requestData = await request.json();

        if (!requestData.password || !requestData.newpassword)
        throw "missing some arguments";
    
        if (requestData.password === requestData.newpassword)
        throw "passwords must be different";
        
        await dbConnect();
        const dbUser = await User.findOne({username: tokenData.username})

        if (!await bcrypt.compare(requestData.password, dbUser.password))
            throw "incorrect current password";
        
        
        const hashedPassword = await bcrypt.hash(requestData.newpassword, 10);

        const result = await User.findOneAndUpdate({username: tokenData.username}, {password: hashedPassword});

        
        return Response.json({status: 'success', received: "Password Changed"})


    } catch (error) {
        return Response.json({status: 'failed', received: error})
    }
}
