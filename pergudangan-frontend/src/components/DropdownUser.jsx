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
import { useState } from "react"
import axiosInstance from "@/utils/axiosInstance"
import useSWR from "swr";
import MyAlertDialog from '@/components/MyAlertDialog';

const VITE_API_URL = import.meta.env.VITE_API_URL

const DropdownUser = () => {
    const navigate = useNavigate()
    const { removeToken, setIsLogin } = useAuth()
    const { userId } = useAuth();
    const { data: img } = useSWR(`/api/auth/img/${userId}`);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

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
    const confirmLogout = () => {
        handleLogout();
        setIsDialogOpen(false);
    };

    const cancelLogout= () => {
        setIsDialogOpen(false);
    };

    return (
        <>
            <DropdownMenu className="border-collapse">
                <DropdownMenuTrigger className="flex transition-all duration-300 items-center gap-1 bg-neutral-100  hover:bg-neutral-200 text-black rounded-full border-none p-1">
                    <Avatar className="h-8 w-8">
                        <AvatarImage className="object-cover" src={`${VITE_API_URL}/${img}`} />
                        <AvatarFallback>AA</AvatarFallback>
                    </Avatar>
                    <ChevronDown />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                        <Link to="/dashboard/profile">Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem as="button" onClick={() => setIsDialogOpen(true)}>
                        <button>
                            Logout
                        </button>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            <MyAlertDialog
                open={isDialogOpen}
                // setOpen={setIsDialogOpen}
                cancel={cancelLogout}
                confirm={confirmLogout}
                title="Confirm Logout"
                message="Are you sure you want to log out this account?"
            />
        </>
    )
}

export default DropdownUser
