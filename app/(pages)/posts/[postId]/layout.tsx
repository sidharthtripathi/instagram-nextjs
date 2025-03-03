
import { redirect } from 'next/navigation';
import { headers } from 'next/headers';
import { ReactNode } from 'react';
export default async function RootLayout({children,comments,picture} : {children:ReactNode,comments : ReactNode,picture:ReactNode}) {
  const username = headers().get('username');
  if (!username) redirect('/join');
  return (
    <main className="py-4 md:container md:flex md:items-start md:gap-4">
      {picture}
      {comments}
    </main>
  );
}
