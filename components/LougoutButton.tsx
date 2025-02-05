"use client"

import { server } from "@/lib/axios"
import { useRouter } from "next/navigation"
export default function Logout(){
    const router = useRouter()
    return <span
    onClick={async()=>{
        await server.post('/api/logout')
        router.push('/join')
    }}
    >Logout</span>
}