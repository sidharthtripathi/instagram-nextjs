import { Cross1Icon, PersonIcon } from '@radix-ui/react-icons';

export default function NotFound() {
  return (
    <div className="flex h-[80dvh] flex-col items-center justify-center">
      <PersonIcon className="size-20" />
      <h2 className="text-2xl font-bold">User Not Found !</h2>
    </div>
  );
}
