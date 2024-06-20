import { NextRequest, NextResponse } from "next/server";
import { jwtVerify} from 'jose'
import { headers } from "next/headers";

export async function middleware(request: NextRequest) {
    
    const token = request.cookies.get('token')
    
    if(!token) return NextResponse.next()
    const requestHeaders = new Headers(request.headers)
    try {
        const {payload} =  await jwtVerify(token.value,new TextEncoder().encode(process.env.JWT_SECRET as string))
        
        requestHeaders.set('username', payload.username as string)
            
    } catch (error) {
        console.log(error)
            
    }
    finally{
      
        return NextResponse.next({
            request : {
                headers : requestHeaders
            }
        })
    }
    
    
  }

//   export const config = {
//     matcher: ['/','/users/:userid?','/create']
//   }
