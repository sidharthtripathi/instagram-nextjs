import { Cross1Icon, PersonIcon } from '@radix-ui/react-icons';

export default function NotFound() {
  return (
    <div className="flex justify-center items-center flex-col">
      <PersonIcon className="w-1/4 h-full" />

      <h2 className="text-2xl font-bold">User Not Found !</h2>
    </div>
  );
}
