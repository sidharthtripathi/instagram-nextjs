"use client"
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import React, { useRef, useState } from 'react'
import { ChangeEvent } from 'react'
function Explore() {
    const [results,setResults] = useState<{avatar:string,username:string,name : string}[]>([])
    const controllerRef = useRef<AbortController>()
    function debouncedSearch(cb:Function,delay : number){
        let timeoutId : number;
        return (e:ChangeEvent<HTMLInputElement>)=>{
            clearTimeout(timeoutId)
            // @ts-ignore
            timeoutId = setTimeout(()=>{
                cb(e)
            },delay) 
        }
    }
    function searchHandler(e:ChangeEvent<HTMLInputElement>){
        if(controllerRef.current) controllerRef.current.abort()
        controllerRef.current = new AbortController()
        fetch(`/api/users/search?q=${e.target.value}`,{
            signal : controllerRef.current.signal
        }).then(res=>res.json()).then(res=>setResults(res)).catch(err=>{})
    }
  return (
    <div className='container mx-auto'>
        <h3 className='font-bold text-2xl'>Find Users</h3>
        <div className='space-y-2'>
            <label className='text-accent-foreground text-sm' htmlFor="search">Search</label>
            <Input type="text" id='search' className=' border-2' placeholder='Search for users...'  onChange={debouncedSearch(searchHandler,500)}  />
        </div>
        <div className='grid grid-cols-1 md:grid-cols-3 mt-4 gap-4'>
            {
                results.map(user=>{
                    return (
                        <SearchList avatar={user.avatar} name={user.name} username = {user.username} key={user.username}/>
                    )
                })
            }
        </div>

        
    </div>
  )
}

function SearchList({avatar,username,name} : {avatar:string,username:string,name : string}){
    return (
        <Link href={`/users/${username}`} prefetch = {false} >
            <div className='flex justify-start gap-4 hover:bg-accent p-2 rounded-md transition-colors'>
                <Avatar>
                    <AvatarFallback>DP</AvatarFallback>
                    <AvatarImage src={avatar} />
                </Avatar>
                <div className="flex-1">
                    <p className="text-sm font-medium">{name}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">@{username}</p>
                </div>

            </div>
        </Link>
    )
}


export default Explore