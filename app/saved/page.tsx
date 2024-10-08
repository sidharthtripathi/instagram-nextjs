export const runtime = 'edge';
import { PostCard } from "@/components/PostCard";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import { redirect } from "next/navigation";


export default async function Saved(){
    const username = headers().get("username")
    if(!username) return redirect('/join')
    const posts = await prisma.post.findMany({
        where : {
            bookmarkedBy : {
                some : {username}
            }
        },
        select : {
            id:true,
            postURL : true,
            author : {
                select : {
                    avatar : true,
                    username : true,
                }
            },
            likedBy : {
                where : {username},
                take : 1,
                select : {id : true}
            },
            caption : true,

        }
    })
    return(
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-4">
            {
                posts.map(post=>(
                <PostCard
                key={post.id}
                caption={post.caption!}
                avatar={post.author.avatar!}
                postURL={post.postURL}
                username={post.author.username}
                postId={post.id}
                bookmarked = {true}
                liked = {post.likedBy.length > 0 ? true : false}

                

                />
            ))
            }
        </div>
    )
}