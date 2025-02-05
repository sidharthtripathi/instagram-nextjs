
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
export async function POST(req:NextRequest) {
    const cookieStore = cookies();
    cookieStore.delete("token")
    return NextResponse.json({message :"successfull logout"})
}