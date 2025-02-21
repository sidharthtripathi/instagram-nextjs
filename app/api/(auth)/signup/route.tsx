
import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { signupSchema } from '@/schema/account';
export async function POST(req: NextRequest) {
  try {
    const { username, email, password, name } = signupSchema.parse(
      await req.json()
    );
    await prisma.user.create({
      data: {
        username,
        email,
        password,
        name
      }
    });
    return NextResponse.json(
      { msg: 'Created Successfully' },
      { status: 201, statusText: 'Account Created' }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { msg: 'Try with different credentials' },
      { status: 401, statusText: 'Try with different credentials' }
    );
  }
}
