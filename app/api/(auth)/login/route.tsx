
import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { SignJWT } from 'jose';
import { cookies } from 'next/headers';
import { loginSchema } from '@/schema/account';
import { ZodError } from 'zod';

import {compare} from 'bcrypt'
export async function POST(req: NextRequest) {
  try {
    const { identifier, password } = loginSchema.parse(await req.json());
    const user = await prisma.user.findFirst({
      where: {
        OR: [
          { username: identifier },
          { email: identifier }
        ]
      },
      select: {
        id: true,
        username: true,
        password:true,
      }
    });
    if (user) {
      const validPass = await compare(password,user.password)
      if(!validPass) throw new Error("Invalid password")
      const token = await new SignJWT(user)
        .setProtectedHeader({ alg: 'HS256' })
        .sign(new TextEncoder().encode(process.env.JWT_SECRET as string));
      cookies().set('token', token, {
        expires: Date.now() + 24 * 60 * 60 * 7 * 1000,
        httpOnly: true
      });
      return NextResponse.json({
        token,
        username: user.username,
      });
    } else
      return NextResponse.json({ msg: 'Invalid Credentials' }, { status: 401 });
  } catch (error) {
    console.log(error)
    if(error instanceof ZodError)
    return NextResponse.json({ msg: error.message }, { status: 400 });
    else return NextResponse.json({ msg: "WRONG USERNAME OR PASSWORD" }, { status: 400 });
  }
}
