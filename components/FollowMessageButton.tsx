


import { FollowButton } from "./FollowButton"
import { UnfollowButton } from "./UnfollowButton"
import { Button } from "./ui/button"

export function FollowMessageButton({isFollowing,username} : {isFollowing:boolean,username:string}){

     return (
        <div className='flex gap-2'>
              { isFollowing ? <UnfollowButton username={username}/> : <FollowButton username={username}/>
              }
              <Button variant="outline" className="flex-1">
                  Message
                </Button>
             </div>
      )
}