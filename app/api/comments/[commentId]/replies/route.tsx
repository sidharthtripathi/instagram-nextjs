
import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';
export async function GET(req: NextRequest) {
  const pathArr = req.nextUrl.pathname.split('/');
  const commentId = pathArr[pathArr.length - 2];
  const replies = await prisma.comment.findUnique({
    where: { id: commentId },
    select: {
      comments: {
        select: {
          author: {
            select: {
              username: true,
              avatar: true,
              name: true
            }
          },
          comment: true,
          repliesCount: true,
          id: true,
          createdAt : true,
        }
      }
    }
  });
  if (!replies) return NextResponse.json({ msg: 'Not Found' }, { status: 404 });
  else return NextResponse.json(replies.comments);
}

export async function POST(req: NextRequest) {
  const userid = headers().get('id');
  if (!userid)
    return NextResponse.json({ msg: 'unauthorized' }, { status: 401 });
  const pathArr = req.nextUrl.pathname.split('/');
  const commentId = pathArr[pathArr.length - 2];
  const { reply } = await req.json();
  if (!reply)
    return NextResponse.json({ msg: 'Invalid request' }, { status: 400 });

  try {
    const [newReply] = await prisma.$transaction([
      prisma.comment.create({
        data: {
          comment: reply,
          commentedToCommentId: commentId,
          authorId: userid
        },
        select: {
          id: true,
          comment: true,
          repliesCount: true,
          author: {
            select: {
              username: true,
              avatar: true,
              name: true
            }
          }
        }
      }),
      prisma.comment.update({
        data: {
          repliesCount: { increment: 1 }
        },
        where: {
          id: commentId
        },
        select: {
          id: true
        }
      })
    ]);
    return NextResponse.json(newReply, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ msg: 'No such comment exist' }, { status: 401 });
  }
}
