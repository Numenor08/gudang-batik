import { Bell } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Link } from "react-router-dom"
import { Separator } from "@/components/ui/separator"
import DropdownUser from "@/components/DropdownUser"
import { RouteSearch } from "@/components/RouteSearch"
import { sidebarRoute2 } from "@/components/AppSidebar"

function Navbar({ children }) {
  

  return (
    <div className="border-b text-white flex items-center justify-between w-full p-2 pr-4 gap-4">
      <div className="flex items-center gap-2">
        {children}
        <Separator orientation="vertical" className="h-6"/>
        <RouteSearch sidebarRoute={sidebarRoute2} />
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
        <DropdownUser></DropdownUser>
      </div>
    </div>
  )
}

export default Navbar