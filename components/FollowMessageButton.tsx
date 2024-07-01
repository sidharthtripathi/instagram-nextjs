"use client"


import { useEffect, useState } from "react"
import { FollowButton } from "./FollowButton"
import { UnfollowButton } from "./UnfollowButton"
import { Button } from "./ui/button"

export function FollowMessageButton({isFollowing,username} : {isFollowing:boolean,username:string}){
    const [loggedInUsername,setUser] = useState<null | string>("notlooked")
    useEffect(()=>{
      setUser(localStorage.getItem("username"))
    },[])
    if(loggedInUsername === 'notlooked') return (
      null
    )
    else{
      if(loggedInUsername===username) return null
      else return (
        <div className='flex gap-2'>
              { isFollowing ? <UnfollowButton username={username}/> : <FollowButton username={username}/>
              }
              <Button variant="outline" className="flex-1">
                  Message
                </Button>
             </div>
      )
    }
  
}