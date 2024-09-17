import { server } from "@/lib/axios";
import { HeartFilledIcon, HeartIcon } from "@radix-ui/react-icons";
import { useState } from "react";

export function LikeDislikeButton({liked,postId} : {liked:boolean,postId:string}){
    const [like,setLikeState] = useState(liked)
    if(like) return (
    <HeartFilledIcon
    onClick={async()=>{
        await server.put(`/api/dislike`,{postId})
        setLikeState(false)
    }}
    />)
    else return (
    <HeartIcon
    onClick={async()=>{
        await server.put(`/api/like`,{postId})
        setLikeState(true)
    }}
    />
    )
}