
import { prisma } from '@/lib/prisma';
import { headers } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const userid = headers().get('id');
  if (!userid)
    return NextResponse.json({ msg: 'unauthorized' }, { status: 401 });
  const pathArr = req.nextUrl.pathname.split('/');
  const postId = pathArr[pathArr.length - 2];
  try {
    await prisma.user.update({
      where: {
        id: userid
      },
      data: {
        bookmarks  : {
            disconnect : {id : postId}
        }
      }
    });

    return NextResponse.json({ msg: 'done' }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ msg: 'No such post exist' }, { status: 404 });
  }
}
