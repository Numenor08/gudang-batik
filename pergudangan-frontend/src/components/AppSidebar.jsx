import { useState } from "react";
import { UserRoundPen, Truck, ChartBarStacked, Shirt, ClipboardMinus, Package, BadgeDollarSign, LayoutDashboard, SquareChartGantt, Container, ChevronDown, ChevronUp } from "lucide-react";
import { Link } from "react-router-dom";
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarHeader,
    SidebarMenuSub,
    SidebarMenuSubItem,
    SidebarMenuSubButton
} from "@/components/ui/sidebar";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { useUrl } from '@/hooks/UrlProvider';
import { useAuth } from "@/hooks/AuthProvider";

// Menu sidebarRoute.
export const sidebarRoute2 = [
    {
        title: "Dashboard",
        url: "/dashboard",
        icon: LayoutDashboard,
    },
    {
        title: "Item",
        url: "/dashboard/management/item",
        icon: Shirt,
    },
    {
        title: "Category",
        url: "/dashboard/management/category",
        icon: ChartBarStacked,
    },
    {
        title: "User",
        url: "/dashboard/management/user",
        icon: UserRoundPen,
    },
    {
        title: "Distributor",
        url: "/dashboard/distributor",
        icon: Truck,
    },
    {
        title: "Supplier",
        url: "/dashboard/supplier",
        icon: Container,
    },
    {
        title: "Transaction",
        url: "/dashboard/transaction",
        icon: BadgeDollarSign,
    },
    {
        title: "Report",
        url: "/dashboard/report",
        icon: ClipboardMinus,
    },
];

const sidebarRoute = [
    {
        title: "Dashboard",
        url: "/dashboard",
        icon: LayoutDashboard,
    },
    {
        title: "Management",
        icon: SquareChartGantt,
        children: [
            {
                title: "Item",
                url: "/dashboard/management/item",
                icon: Shirt,
            },
            {
                title: "Category",
                url: "/dashboard/management/category",
                icon: ChartBarStacked,
            },
            {
                title: "User",
                url: "/dashboard/management/user",
                icon: UserRoundPen,
            },
        ],
    },
    {
        title: "Distributor",
        url: "/dashboard/distributor",
        icon: Truck,
    },
    {
        title: "Supplier",
        url: "/dashboard/supplier",
        icon: Container,
    },
    {
        title: "Transaction",
        url: "/dashboard/transaction",
        icon: BadgeDollarSign,
    },
    {
        title: "Report",
        url: "/dashboard/report",
        icon: ClipboardMinus,
    },
];

const filtersidebarRouteRole = (sidebarRoute, role) => {
    if (role !== "admin") {
        return sidebarRoute.map(item => {
            if (item.children) {
                return {
                    ...item,
                    children: item.children.filter(child => child.title !== "User")
                };
            }
            return item;
        });
    }
    return sidebarRoute;
}

export default function AppSidebar() {
    const [isManagementOpen, setIsManagementOpen] = useState(false);
    const { url } = useUrl();
    const { role } = useAuth();
    const filteredsidebarRoute = filtersidebarRouteRole(sidebarRoute, role);

    const toggleManagement = () => {
        setIsManagementOpen(!isManagementOpen);
    };

    return (
        <Sidebar variant="inset" collapsible="icon">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                            <Link to="/dashboard">
                                <Package />
                                <h1 className="">GudangBatik</h1>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Application</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {filteredsidebarRoute.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    {item.children ? (
                                        <Collapsible>
                                            <CollapsibleTrigger asChild>
                                                <SidebarMenuButton className={url.includes('/dashboard/management') ? "font-semibold bg-sidebar-accent" : ""} onClick={toggleManagement}>
                                                    <item.icon />
                                                    <span>{item.title}</span>
                                                    {isManagementOpen ? <ChevronUp /> : <ChevronDown />}
                                                </SidebarMenuButton>
                                            </CollapsibleTrigger>
                                            <CollapsibleContent className="ml-0">
                                                <SidebarMenuSub>
                                                    {item.children.map((child) => (
                                                        <SidebarMenuSubItem key={child.title}>
                                                            <SidebarMenuSubButton asChild>
                                                                <Link className={child.url === url ? "font-semibold bg-sidebar-accent" : ""} to={child.url}>
                                                                    {/* <Separator orientation="vertical" className="h-6" /> */}
                                                                    <child.icon />
                                                                    <span>{child.title}</span>
                                                                </Link>
                                                            </SidebarMenuSubButton>
                                                        </SidebarMenuSubItem>
                                                    ))}
                                                </SidebarMenuSub>
                                            </CollapsibleContent>
                                        </Collapsible>
                                    ) : (
                                        <SidebarMenuButton asChild>
                                            <Link className={item.url === url ? "font-semibold bg-sidebar-accent" : ""} to={item.url}>
                                                <item.icon />
                                                <span>{item.title}</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    )}
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    );
}
