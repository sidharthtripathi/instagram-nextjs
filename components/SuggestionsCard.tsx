import {Card,CardContent,CardHeader} from '@/components/ui/card'
import {Avatar,AvatarFallback,AvatarImage} from '@/components/ui/avatar'
import { Button } from './ui/button'
import Link from 'next/link'
export default function SuggestionsCard(){
    return (
        <div className="hidden md:block">
            <Card className="border-0 rounded-xl overflow-hidden shadow-sm">
              <CardHeader className="flex items-center gap-4 p-4 border-b">
                <div className="text-sm font-medium">Suggested</div>
              </CardHeader>
              <CardContent className="p-4 grid gap-4">
                {[...Array(5)].map((_, i) => (
                  <Link
                    key={i}
                    href="#"
                    className="flex items-center gap-3 hover:bg-accent  rounded-md p-2"
                    prefetch={false}
                  >
                    <Avatar className="w-10 h-10 border">
                      <AvatarImage src="/placeholder-user.jpg" />
                      <AvatarFallback>AC</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="text-sm font-medium">Acme Inc</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">@acmeinc</div>
                    </div>
                    <Button variant="ghost" size="icon" className="rounded-full">
                      <PlusIcon className="w-5 h-5" />
                      <span className="sr-only">Follow</span>
                    </Button>
                  </Link>
                ))}
              </CardContent>
            </Card>
          </div>
    )
}

function PlusIcon(props : any) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M5 12h14" />
        <path d="M12 5v14" />
      </svg>
    )
  }