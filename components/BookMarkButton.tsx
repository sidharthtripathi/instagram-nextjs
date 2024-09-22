"use client"
import { server } from "@/lib/axios";
import { Bookmark } from "lucide-react";
import { useState } from "react";

export function BookMarkButton({bookmarked,postId} : {bookmarked: boolean,postId : string}){
    const [marked,setMarked] = useState(bookmarked)
    if(marked) return (
        <Bookmark
         fill="white"
         onClick={async()=>{
            // remove bookmark
            await server.post(`/api/posts/${postId}/unmark`)
            setMarked(false)
         }}
         />
    )
    else return (
    <Bookmark
    onClick={async()=>{
        await server.post(`/api/posts/${postId}/bookmark`)
        setMarked(true)
    }}
    />
)
}