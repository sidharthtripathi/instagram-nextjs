import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import z from 'zod'
import jwt from 'jsonwebtoken'
import { cookies } from "next/headers";
const loginSchema = z.object({
    identifier : z.string().min(1),
    password : z.string().min(1),
    
})

export async function POST(req : NextRequest){
    try {
        
        const {identifier,password} = loginSchema.parse(await req.json())
        const user = await prisma.user.findFirst({
            where : {
                OR : [{username:identifier,password},{email : identifier,password}]
            },
            select : {
                id : true,
                username : true,
                email : true
            }
        })
        if(user) {
            const token = jwt.sign(user,process.env.JWT_SECRET as string)
            cookies().set("token",token)
            return NextResponse.json({token})
        }
        else return NextResponse.json({msg : "Invalid Credentials"},{status : 401})
    } catch (error) {
        
        return NextResponse.json({msg : "Invalid Payload"},{status : 400})
    }
}