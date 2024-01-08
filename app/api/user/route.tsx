import { AuthCheck } from '@/app/api/middleware'
import { User } from '@/app/models/user'


export async function GET(request: Request) {
    try {
        const jwtData = AuthCheck(request);
        const dbUser = await User.findOne({username: jwtData.username});
    
        if (!dbUser)
                throw "user doesnt exist"
        
        return Response.json({status: 'success', recevied: dbUser});
    } catch (error) {
        return Response.json({status: 'failed', received: error});
    }
}

interface PatchData {
    firstname?: string,
    lastname?: string,
    bookmarkedsnippets?: [string],
    bundleids?: [string]
}

export async function PATCH(request: Request) {
    try {
        const jwtData = AuthCheck(request);
        const requestData = await request.json();

        const dbUser = await User.findOne({username: jwtData.username});
        
        if (!dbUser)
            throw "user doesnt exist"


        const sanitizedData: PatchData = {}

        for (const key in requestData){
            switch (key) {
                case "firstname":
                    sanitizedData.firstname = requestData.firstname
                    break;
                case "lastname":
                    sanitizedData.lastname = requestData.lastname
                    break;
                case "bookmarkedsnippets":{
                    const bmSnippetsSet = new Set(dbUser.bookmarkedsnippets);

                    if (bmSnippetsSet.has(requestData.bookmarkedsnippets))
                        bmSnippetsSet.delete(requestData.bookmarkedsnippets)
                    else
                        bmSnippetsSet.add(requestData.bookmarkedsnippets)   

                    sanitizedData.bookmarkedsnippets = Array.from(bmSnippetsSet) as [string]

                }
                    break;
                case "bundleids":
                    const bundleSet = new Set(dbUser.bundleids);

                    if (bundleSet.has(requestData.bookmarkedsnippets))
                        bundleSet.delete(requestData.bookmarkedsnippets)
                    else
                        bundleSet.add(requestData.bookmarkedsnippets)   

                    sanitizedData.bookmarkedsnippets = Array.from(bundleSet) as [string]

                    break;
                default:
                    break;
            }
        }
        
        const updateResult = await User.findOneAndUpdate({username: jwtData.username}, {...sanitizedData}, {new: true});
    
        return Response.json({status: 'success', received: updateResult})
    } catch (error) {
        return Response.json({status: 'failed', received: error})        
    }
}