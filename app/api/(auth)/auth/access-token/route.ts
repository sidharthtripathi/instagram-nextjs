import { jwtVerify, SignJWT } from 'jose';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const refreshToken = cookies().get('refresh-token');
    if (!refreshToken) return NextResponse.json({}, { status: 400 });
    const user = await jwtVerify(
      refreshToken.value,
      new TextEncoder().encode(process.env.JWT_SECRET)
    );
    const accessToken = await new SignJWT({ username: user.payload.username })
      .setProtectedHeader({ alg: 'HS256' })
      .sign(new TextEncoder().encode(process.env.JWT_SECRET as string));
    cookies().set('access-token', accessToken, {
      expires : Date.now() + (15*60*1000),
      httpOnly: true
    });
    return NextResponse.json({})
  } catch (error) {
    return NextResponse.json({msg : "something went wrong"},{status : 400})
  }
}
