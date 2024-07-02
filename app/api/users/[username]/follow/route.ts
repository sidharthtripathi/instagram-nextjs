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
    const user = await prisma.user.update({
      where: {
        username: requestedUser
      },
      data: {
        followersCount: {
          increment: 1
        },
        followers: {
          connect: {
            username: requestingUser
          },
          update: {
            data: {
              followingsCount: {
                increment: 1
              }
            },
            where: {
              username: requestingUser
            }
          }
        }
      }
    });
    return NextResponse.json({ msg: `You are now following ${username}` });
  } catch (error) {
    return NextResponse.json(
      { msg: 'User to be followed not found' },
      { status: 401 }
    );
  }
}
