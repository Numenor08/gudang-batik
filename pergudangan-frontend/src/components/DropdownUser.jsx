import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronDown } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "@/hooks/AuthProvider"
import axiosInstance from "@/utils/axiosInstance"

const DropdownUser = () => {
    const navigate = useNavigate()
    const { removeToken, setIsLogin } = useAuth()
    const img = localStorage.getItem('userImg')
    const VITE_API_URL = import.meta.env.VITE_API_URL

    const handleLogout = async () => {
        try {
            await axiosInstance.post('/api/auth/logout')
        } catch (error) {
            console.error('Logout error:', error)
        } finally {
            removeToken()
            setIsLogin(true);
            navigate('/')
        }
    }

    return (
        <DropdownMenu className="border-collapse">
            <DropdownMenuTrigger className="flex items-center gap-1  hover:bg-neutral-100 text-black rounded-full border-none p-1">
                <Avatar className="h-8 w-8">
                    <AvatarImage className="object-cover" src={`${VITE_API_URL}/${img}`} />
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
                <DropdownMenuItem as="button" onClick={handleLogout}>
                    Logout
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default DropdownUser