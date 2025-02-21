"use client"
// the feature one
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
        setLikeState(false)

        try {
            await server.post(`/api/posts/${postId}/dislike`)
        } catch (error) {
            setLikeState(true)
        }
        
    }}
    />)
    else return (
    <Heart
    onClick={async()=>{
        setLikeState(true)
        try {
            await server.post(`/api/posts/${postId}/like`)
        } catch (error) {
            setLikeState(false)
        }
        
    }}
    />
    )
}