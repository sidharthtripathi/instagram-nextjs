import { NextRequest, NextResponse } from "next/server";
import { jwtVerify} from 'jose'

export async function middleware(request: NextRequest) {
    
    const token = request.cookies.get('token')
    if(!token) return NextResponse.redirect(new URL('/join', request.url))
    else{
        try {
            const {payload} =  await jwtVerify(token.value,new TextEncoder().encode(process.env.JWT_SECRET as string))
            const requestHeaders = new Headers(request.headers)
            requestHeaders.set('user', JSON.stringify(payload))
            
        } catch (error) {
            console.log(error)
            return NextResponse.redirect(new URL('/join', request.url))
            
        }
    }
    
  }

  export const config = {
    matcher: ['/','/users/:userid+']
  }
