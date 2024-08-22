export const runtime = "edge";
import { getPutSignedURL } from '@/lib/s3';
import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import { prisma } from '../../../lib/prisma';
import { headers } from 'next/headers';
export async function POST(req : Request) {
  const username = headers().get('username');
  const userid = headers().get('id') as string;
  if (!username)
    return NextResponse.json({ msg: 'Login First' }, { status: 401 });
  try {
    const { caption } = await req.json();

    const imgURL = uuidv4();
    const signedUrl = await getPutSignedURL(imgURL);

    await prisma.$transaction([
      prisma.post.create({
        data: {
          postURL: `https://${process.env.CDN_DOMAIN}/${imgURL}`,
          caption: caption as string,
          authorID: userid
        }
      }),
      prisma.user.update({
        where: {
          id: userid
        },
        data: {
          postCount: {
            increment: 1
          }
        }
      })
    ]);

    return NextResponse.json({ signedUrl }, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ msg: 'something went Wrong' }, { status: 501 });
  }
}
