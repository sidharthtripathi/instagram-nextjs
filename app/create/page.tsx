
import PostUploader from "./PostUploader";
import { redirect } from 'next/navigation'
import { headers } from 'next/headers'
export default function Page(){
  const username = headers().get("username")
  if(!username) redirect('/join')
  return (
    <div>
      <h2 className="font-bold text-xl text-center mt-2">Create Your Post</h2>
      <PostUploader/>
    </div>
  )
}