import { prisma } from "@/lib/prisma"
import { NextApiRequest } from "next"
import { NextResponse } from "next/server"

export async function GET(req:NextApiRequest){
    // @ts-ignore
    const searchParams = new URLSearchParams(new URL(req.url).searchParams)
    const userQuery= searchParams.get("q") as string
    if(!userQuery) return NextResponse.json([])
    const userList = await prisma.user.findMany({
        where : {
            OR : [{
                username : {
                    contains : userQuery
                }
            },{
                name : {
                    contains : userQuery
                }
            }]
        },
        select : {
            username : true,
            avatar : true,
            name : true
        }
    })
    return NextResponse.json(userList)
}