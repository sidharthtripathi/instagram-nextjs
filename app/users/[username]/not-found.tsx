import { Cross1Icon, PersonIcon } from '@radix-ui/react-icons';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-[80dvh]">
      <PersonIcon className="size-20" />
      <h2 className="text-2xl font-bold">User Not Found !</h2>
    </div>
  );
}
