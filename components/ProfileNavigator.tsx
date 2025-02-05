import { headers } from 'next/headers';
import Link from 'next/link';
import { DropdownMenuItem } from './ui/dropdown-menu';
import Logout from './LougoutButton';

function ProfileNavigator() {
  const username = headers().get('username');
  return (
    <>
      <DropdownMenuItem asChild>
        {username && (
          <Link href={`/users/${username}`} className="w-full" prefetch={false}>
            Profile
          </Link>
        )}
      </DropdownMenuItem>
      <DropdownMenuItem>
        {
          username && <Logout/>
        }
      </DropdownMenuItem>
    </>
  );
}

export default ProfileNavigator;
