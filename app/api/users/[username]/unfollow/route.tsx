
import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { prisma } from '@/lib/prisma';
export async function POST(
  req: Request,
  { params: { username } }: { params: { username: string } }
) {
  const requestingUser = headers().get('username');
  if (!requestingUser)
    return NextResponse.json({ msg: 'Login first' }, { status: 401 });
  const requestedUser = username;
  try {
    await prisma.$transaction([
      prisma.user.update({
        where: {
          username: requestedUser
        },
        data: {
          followersCount: {
            decrement: 1
          },
          followers: {
            disconnect: {
              username: requestingUser
            }
          }
        }
      }),
      prisma.user.update({
        where: { username: requestingUser },
        data: {
          followingsCount: {
            decrement: 1
          }
        }
      })
    ]);
    return NextResponse.json({ msg: `unfollowed ${username}` });
  } catch (error) {
    return NextResponse.json(
      { msg: 'User to be unfollowed not found' },
      { status: 401 }
    );
  }
}
