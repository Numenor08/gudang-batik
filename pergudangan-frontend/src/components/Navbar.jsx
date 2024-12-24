import { Separator } from "@/components/ui/separator"
import DropdownUser from "@/components/DropdownUser"
import { RouteSearch } from "@/components/RouteSearch"
import { sidebarRoute2 } from "@/components/AppSidebar"

function Navbar({ children }) {


  return (
    <div className="border-b text-white flex items-center justify-between w-full p-2 pr-4 gap-4">
      <div className="flex items-center gap-2">
        {children}
        <Separator orientation="vertical" className="h-6" />
        <RouteSearch sidebarRoute={sidebarRoute2} />
      </div>
      <div className="flex items-center">
        <DropdownUser></DropdownUser>
      </div>
    </div>
  )
}

export default Navbar