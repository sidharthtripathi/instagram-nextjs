"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Cross1Icon, ImageIcon } from "@radix-ui/react-icons"
import { useState } from "react"

export default function Create(){
  const [img,setImg] = useState<undefined | string>(undefined)
  const [file,setFile] = useState<null | File>(null)
  const [caption,setCaption] = useState("")
  return <div className="container gap-y-4 flex flex-col justify-center items-center ">
    {
      img ? 
      <div className="relative">
        <img src={img} alt="" className="size-64 object-contain relative" />
        <button className="absolute top-2 right-2" onClick={()=>{
          setImg(undefined)
        }}>
          <Cross1Icon/>
        </button>
      </div> :
      
        <div className=" relative  size-64"> 
          <ImageIcon className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 h-1/2"/>
          <input type="file" className=" absolute opacity-0 w-full h-full" onChange={(e)=>{
            
            // @ts-ignore
            setImg(URL.createObjectURL(e.target.files[0]))
            // @ts-ignore
            setFile(e.target.files[0])
          }} />
        </div>
      
    }
    <div className="flex gap-4">
      <Input placeholder="Caption your post..." type="text" onChange={(e)=>{
        setCaption(e.target.value)
        console.log(caption)
      }}/>
      <Button onClick={()=>{
        fetch('/api/post',{
          method : "POST",
          body: JSON.stringify({caption})
        }).then(res=>res.json()).then(res=>{
          const {signedUrl} = res

          fetch(signedUrl,{
            method  : "PUT",
            body : file
          }).then(res=>console.log(res.status)).catch(err=>console.log(err))

        }).catch(err=>console.log(err))
      }}>Submit</Button>
    </div>
  </div>
}