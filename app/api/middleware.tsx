import jwt from "jsonwebtoken"

export function AuthCheck(request: Request) : jwt.JwtPayload {

    const token = request.headers.get('Authorization')?.split(" ")[1];
    
    if (!token)
        throw "No token found in Authorization header";
    
    const jwtResult = jwt.verify(token, process.env.CRYPTO_SECRET as string) as jwt.JwtPayload;

    return jwtResult

}