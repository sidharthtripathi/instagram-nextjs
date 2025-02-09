
import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const searchParams = new URLSearchParams(new URL(req.url).searchParams);
  const userQuery = searchParams.get('q') as string;
  if (!userQuery) return NextResponse.json([]);
  const userList = await prisma.user.findMany({
    where: {
      OR : [{username : {search : userQuery}},{name : {search : userQuery}}]
    },
    select: {
      username: true,
      avatar: true,
      name: true
    }
  });
  return NextResponse.json(userList);
}
