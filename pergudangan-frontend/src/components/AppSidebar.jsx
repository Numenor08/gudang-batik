import { useState } from "react";
import { UserRoundPen, PersonStanding, ArrowLeftRight, Shirt, ClipboardMinus, Package, BadgeDollarSign, LayoutDashboard, SquareChartGantt, Container, Settings, ChevronDown, ChevronUp } from "lucide-react";
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
                title: "Transaction",
                url: "/dashboard/management/transaction",
                icon: ArrowLeftRight,
            },
            {
                title: "Supplier",
                url: "/dashboard/management/supplier",
                icon: PersonStanding,
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
        title: "Supplier",
        url: "/dashboard/supplier",
        icon: Container,
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

export default function AppSidebar() {
    const [isManagementOpen, setIsManagementOpen] = useState(false);
    const { url } = useUrl();

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
                            {items.map((item) => (
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
