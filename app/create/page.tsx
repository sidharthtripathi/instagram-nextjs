
import PostUploader from './PostUploader';
import { redirect } from 'next/navigation';
import { headers } from 'next/headers';
export default function Page() {
  const username = headers().get('username');
  if (!username) redirect('/join');
  return (
    <div>
      <h2 className="mt-2 text-center text-xl font-bold">Create Your Post</h2>
      <PostUploader />
    </div>
  );
}
