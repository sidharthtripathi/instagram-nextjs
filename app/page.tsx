



import { redirect } from 'next/navigation'
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import PostCard from "@/components/PostCard"
import { prisma } from "@/lib/prisma"
import { headers } from "next/headers"
import { NextResponse } from "next/server"

export default async function Component() {
  const username = headers().get("username")
  if(!username) return redirect('/join')
  const user = await prisma.user.findFirst({
    where : {
      username
    },
    
    select : {
      followings : {
        select : {
          avatar : true,
          username : true,
          posts : {
            take : 10,
            select : {
              postURL : true,
              caption : true,
              id : true
            }
          }
        }
      }
    }
  })
  if(!user) return redirect('/join')
  return (
    <div className="flex flex-col h-full">
      <main className="flex-1">
        <div className="container mx-auto px-4 md:px-6 py-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="col-span-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {
              (user.followings.map(user=>{
                return user.posts.map(post=>{
                  return <PostCard avatar={user.avatar} postURL={post.postURL} caption={post.caption} key={post.id} username={user.username}/>
                })
              })).flat()
            }
          </div>
          <div className="hidden md:block">
            <Card className="border-0 rounded-xl overflow-hidden shadow-sm">
              <CardHeader className="flex items-center gap-4 p-4 border-b">
                <div className="text-sm font-medium">Suggested</div>
              </CardHeader>
              <CardContent className="p-4 grid gap-4">
                {[...Array(5)].map((_, i) => (
                  <Link
                    key={i}
                    href="#"
                    className="flex items-center gap-3 hover:bg-accent  rounded-md p-2"
                    prefetch={false}
                  >
                    <Avatar className="w-10 h-10 border">
                      <AvatarImage src="/placeholder-user.jpg" />
                      <AvatarFallback>AC</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="text-sm font-medium">Acme Inc</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">@acmeinc</div>
                    </div>
                    <Button variant="ghost" size="icon" className="rounded-full">
                      <PlusIcon className="w-5 h-5" />
                      <span className="sr-only">Follow</span>
                    </Button>
                  </Link>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}





function PlusIcon(props : any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  )
}


