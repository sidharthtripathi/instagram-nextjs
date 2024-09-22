"use client"
import { server } from "@/lib/axios";
import { Heart} from 'lucide-react'
import { useState } from "react";

export function LikeDislikeButton({liked,postId} : {liked:boolean,postId:string}){
    const [like,setLikeState] = useState(liked)
    if(like) return (
    <Heart
    color="red"
    fill="red"
    onClick={async()=>{
        await server.post(`/api/posts/${postId}/dislike`)
        setLikeState(false)
    }}
    />)
    else return (
    <Heart
    onClick={async()=>{
        await server.post(`/api/posts/${postId}/like`)
        setLikeState(true)
    }}
    />
    )
}