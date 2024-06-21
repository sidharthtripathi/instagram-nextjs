"use client"

import { FollowButton } from "./FollowButton"
import { Button } from "./ui/button"

export function FollowMessageButton({isFollowing,username} : {isFollowing:boolean,username:string}){
    const loggedInUsername = localStorage.getItem("username")
    return (
     loggedInUsername === username ? null :
            <div className='flex gap-2'>
                { isFollowing ? <Button className='flex-1' variant={"destructive"}>Unfollow</Button> : <FollowButton username={username}/>
                }
                <Button variant="outline" className="flex-1">
                  Message
                </Button>
            </div>
    )
}