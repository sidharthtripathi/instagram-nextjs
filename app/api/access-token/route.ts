import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { jwtVerify, SignJWT } from "jose";
export async function GET(){
    const refreshToken = cookies().get("refresh-token")
    if(!(refreshToken?.value)) return NextResponse.json("FORBIDDEN",{status : 403})
    try {
        const {payload} = await jwtVerify(refreshToken.value,new TextEncoder().encode(process.env.JWT_SECRET as string))
        const token = await new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' }).setExpirationTime("15 minutes")
        .sign(new TextEncoder().encode(process.env.JWT_SECRET as string));
        cookies().set("access-token",token)
        return NextResponse.json({"access-token" : token})
    } catch (error) {
        return NextResponse.json("FORBIDDEN",{status : 403})
    }
}