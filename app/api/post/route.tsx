import { getPutSignedURL } from "@/lib/s3";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from 'uuid';
import {prisma} from '../../../lib/prisma'
import { headers } from "next/headers";
export async function POST(req:NextRequest){
    const username = headers().get("username")
    if(!username) return NextResponse.json({msg : "Login First"},{status : 401})
    try {
        const {caption} = await req.json()
        console.log("server: ",caption)
        const imgURL = uuidv4()
        const signedUrl = await getPutSignedURL(imgURL)
    
        await prisma.user.update({
            where : {
                username
            },
            data : {
                postCount : {
                    increment : 1
                },
                posts : {
                    create : {
                        caption,
                        postURL : `https://${process.env.BUCKETNAME}.s3.${process.env.AWSREGION}.amazonaws.com/${imgURL}`
                    }
                }
            }
        })

        
       return NextResponse.json({signedUrl},{status  : 201})
    } catch (error) {
        console.log(error)
        return NextResponse.json({msg : "something went Wrong"},{status : 501})
    }
   
    
}