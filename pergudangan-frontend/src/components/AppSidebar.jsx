import { useState } from "react";
import { UserRoundPen, Truck, ChartBarStacked, Shirt, ClipboardMinus, Package, BadgeDollarSign, LayoutDashboard, SquareChartGantt, Container, Settings, ChevronDown, ChevronUp } from "lucide-react";
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

// Menu items.
const items = [
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
                title: "Distributor",
                url: "/dashboard/management/distributor",
                icon: Truck,
            },
            {
                title: "Supplier",
                url: "/dashboard/management/supplier",
                icon: Container,
            },
            {
                title: "User",
                url: "/dashboard/management/user",
                icon: UserRoundPen,
            },
        ],
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
    {
        title: "Settings",
        url: "/dashboard/setting",
        icon: Settings,
    },
];

const filterItemsRole = (items, role) => {
    if (role !== "admin") {
        return items.map(item => {
            if (item.children) {
                return {
                    ...item,
                    children: item.children.filter(child => child.title !== "User")
                };
            }
            return item;
        });
    }
    return items;
}

export default function AppSidebar() {
    const [isManagementOpen, setIsManagementOpen] = useState(false);
    const { url } = useUrl();
    const { role } = useAuth();
    const filteredItems = filterItemsRole(items, role);
    
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
                            {filteredItems.map((item) => (
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
