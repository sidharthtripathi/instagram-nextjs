export const runtime = "edge";
import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { SignJWT } from 'jose';
import { cookies } from 'next/headers';
import { loginSchema } from '@/schema/account';

export async function POST(req: NextRequest) {
  try {
    const { identifier, password } = loginSchema.parse(await req.json());
    const user = await prisma.user.findFirst({
      where: {
        OR: [
          { username: identifier, password },
          { email: identifier, password }
        ]
      },
      select: {
        id: true,
        username: true,
        email: true
      }
    });
    if (user) {
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
        email: user.email
      });
    } else
      return NextResponse.json({ msg: 'Invalid Credentials' }, { status: 401 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ msg: 'Invalid Payload' }, { status: 400 });
  }
}
