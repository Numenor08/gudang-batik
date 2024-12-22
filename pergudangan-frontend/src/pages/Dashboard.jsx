import { Outlet } from "react-router-dom";
import { SidebarProvider, SidebarTrigger, SidebarInset } from "@shadcn/sidebar";
import AppSidebar from "@/components/AppSidebar";
import Navbar from "@/components/Navbar";

function SidebarComponent({ children }) {
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <div className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
                    <Navbar>
                        <SidebarTrigger className="text-black text-opacity-80" />
                    </Navbar>
                </div>
                <div className="px-4 py-2 flex-1 ">
                    {children}
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}

function Dashboard() {
    return (
        <SidebarComponent>
            <Outlet />
        </SidebarComponent>
    );
}

export default Dashboard;