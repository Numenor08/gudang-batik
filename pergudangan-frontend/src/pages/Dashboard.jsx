import { Outlet } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@shadcn/sidebar";
import AppSidebar from "@/components/AppSidebar";
import Navbar from "@/components/Navbar";

function SidebarComponent({ children }) {
    return (
        <SidebarProvider>
            <AppSidebar />
            <main className="flex flex-col w-full h-screen">
                <Navbar>
                    <SidebarTrigger className="text-black text-opacity-80" />
                </Navbar>
                {children}
            </main>
        </SidebarProvider>
    );
}

function Dashboard() {
    return (
        <div>
            <SidebarComponent>
                <div className="px-4 py-2">
                    <Outlet />
                </div>
            </SidebarComponent>
        </div>
    );
}

export default Dashboard;