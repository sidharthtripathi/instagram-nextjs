"use client"
// the feature one
import { server } from "@/lib/axios";
import { Bookmark } from "lucide-react";
import { useState } from "react";

export function BookmarkFeatureButton({bookmarked,postId} : {bookmarked: boolean,postId : string}){
    const [marked,setMarked] = useState(bookmarked)
    if(marked) return (
        <Bookmark
         fill="white"
         onClick={async()=>{
            // remove bookmark
            setMarked(false)
            try {
                await server.post(`/api/posts/${postId}/unmark`)
            } catch (error) {
                setMarked(true)
            }
            
         }}
         />
    )
    else return (
    <Bookmark
    onClick={async()=>{
        setMarked(true)
        try {
            await server.post(`/api/posts/${postId}/bookmark`)
        } catch (error) {
            setMarked(false)
        }
        
    }}
    />
)
}