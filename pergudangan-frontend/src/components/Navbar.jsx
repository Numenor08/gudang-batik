import { ChevronDown, Bell, Search } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"

function Navbar({ children }) {
  return (
    <div className="border-b text-white flex items-center justify-between p-2 pr-4 gap-4">
      <div className="flex items-center gap-2">
        {children}
        <Separator orientation="vertical" className="h-6"/>
        <form action="" className="flex w-full max-w-sm items-center space-x-2">
          <Input className="focus-visible:ring-offset-0 focus-visible:ring-1 text-black" type="text" placeholder="Search" />
          <Button className="p-3" type="submit">
            <Search color="#FFFFFF" />
          </Button>
        </form>
      </div>
      <div className="flex items-center">
        <DropdownMenu className="border-collapse">
          <DropdownMenuTrigger className="flex items-center gap-1  hover:bg-neutral-100 text-black rounded-full border-none p-1">
            <Bell color="black" strokeWidth={1} size={"1.25rem"} />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Notification</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link to="/dashboard/profile">Notif 1</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link to="/dashboard/setting">Notif 2</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link to="/logout">Notif 3</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu className="border-collapse">
          <DropdownMenuTrigger className="flex items-center gap-1  hover:bg-neutral-100 text-black rounded-full border-none p-1">
            <Avatar className="h-8 w-8">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>AA</AvatarFallback>
            </Avatar>
            <ChevronDown />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link to="/dashboard/profile">Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link to="/dashboard/setting">Setting</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link to="/logout">logout</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}

export default Navbar