import * as React from "react"
import { useNavigate } from "react-router-dom"
import { Search } from 'lucide-react'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useAuth } from "@/hooks/AuthProvider"

const filtersidebarRouteRole = (sidebarRoute, role) => {
    if (role !== "admin") {
        return sidebarRoute.filter(item => item.title !== "User");
    }
    return sidebarRoute;
}

export function RouteSearch({ sidebarRoute, className }) {
    const [open, setOpen] = React.useState(false)
    const navigate = useNavigate();
    const { role } = useAuth();
    const routes = filtersidebarRouteRole(sidebarRoute, role);

    React.useEffect(() => {
        const down = (e) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault()
                setOpen((open) => !open)
            }
        }

        document.addEventListener("keydown", down)
        return () => document.removeEventListener("keydown", down)
    }, [])

    const runCommand = React.useCallback((command) => {
        setOpen(false)
        command()
    }, [])

    return (
        <>
            <Button
                variant="outline"
                className={cn(
                    "relative w-full justify-start text-sm text-muted-foreground sm:pr-12 md:w-40 lg:w-64",
                    className
                )}
                onClick={() => setOpen(true)}
            >
                <Search className="mr-2 h-4 w-4" />
                <span>Search...</span>
                <kbd className="pointer-events-none absolute right-1.5 top-1.5 hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
                    <span className="text-xs">⌘</span>K
                </kbd>
            </Button>
            <CommandDialog open={open} onOpenChange={setOpen}>
                <CommandInput placeholder="Type a command or search..." />
                <CommandList>
                    <CommandEmpty>No results found.</CommandEmpty>
                    <CommandGroup heading="Routes">
                        <ScrollArea className="h-72">
                            {routes.map((route) => (
                                <CommandItem
                                    key={route.url}
                                    value={route.title}
                                    onSelect={() => {
                                        runCommand(() => navigate(route.url))
                                    }}
                                >
                                    {route.icon && <route.icon className="mr-2 h-4 w-4" />}
                                    <span>{route.title}</span>
                                </CommandItem>
                            ))}
                        </ScrollArea>
                    </CommandGroup>
                </CommandList>
            </CommandDialog>
        </>
    )
}

