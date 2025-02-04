
import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import z, { ZodError, string } from 'zod';
const payloadSchema = z.object({
  postId: z.string(),
  comment: z.string()
});
export async function POST(req: NextRequest) {
  const username = req.headers.get('username');
  const userid = req.headers.get('id');
  if (!username || !userid)
    return NextResponse.json({ msg: 'UnAuthorized' }, { status: 401 });
  try {
    const { postId, comment } = await payloadSchema.parseAsync(
      await req.json()
    );
    const newComment = await prisma.$transaction([
      prisma.comment.create({
        data: {
          comment,
          postId: postId,
          authorId: userid
        },
        select: {
          id: true,
          comment: true,
          author: { select: { avatar: true, name: true, username: true } }
        }
      }),
      prisma.post.update({
        where: {
          id: postId
        },
        data: {
          commentsCount: {
            increment: 1
          }
        },
        select: {
          id: true
        }
      })
    ]);
    return NextResponse.json(newComment[0], { status: 201 });
  } catch (error) {
    if (error instanceof ZodError)
      return NextResponse.json({ error }, { status: 400 });
    else {
      console.log(error);
      return NextResponse.json(
        { msg: 'Something went wrong' },
        { status: 400 }
      );
    }
  }
}
