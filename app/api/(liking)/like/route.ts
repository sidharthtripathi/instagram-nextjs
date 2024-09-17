import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";
export async function PUT(req:NextRequest){
    const username = headers().get("username")
    if(!username) return NextResponse.json("INVALID TOKEN",{status : 401})
    const {postId} = await req.json();
    await prisma.post.update({
        where : {id:postId},
        data : {
            likedBy : {connect : {username}},
            likesCount : {increment : 1}
        }
    })
}