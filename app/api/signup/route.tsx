import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import z from 'zod'


const signupSchema = z.object({
    username : z.string().min(1),
    email : z.string().email(),
    password : z.string().min(8)
})

export async function POST(req:NextRequest){
    try {
        const {username,email,password} = signupSchema.parse(await req.json())
        await prisma.user.create({
            data : {
                username,email,password
            },
            
        })
        return NextResponse.json({msg : "Created Successfully"},{status : 201,statusText : "Account Created"})
    } catch (error) {
        return NextResponse.json({msg : "Try with differenr credentials"},{status : 401, statusText : "Try with different credentials"})
    }
}