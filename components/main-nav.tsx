"use client"

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

export function MainNav({
    className,
    ...props
}: React.HTMLAttributes<HTMLElement>) {
    // Import routes from Next
    const pathname = usePathname();
    const params = useParams();

    // Create objects to be used by routes
    const routes = [
        {
            href: `/${params.storeid}`,
            label: 'Overview',
            active: pathname === `/${params.storeid}`
        },
        {
            href: `/${params.storeid}/settings`,
            label: 'Settings',
            active: pathname === `/${params.storeid}/settings`
        }
    ];


    return (
        <nav
            className={cn("flex items-center space-x-4 lg:space-x-6", className)}
        >
            {routes.map((route) => {
                const { href, label, active } = route;
                return (
                    <Link
                        key={href}
                        href={href}
                        className={cn("text-sm font-medium transition-colors hover:text-primary",
                            active ? "text-black dark:text-white" : "text-muted-foreground"
                        )}
                    >
                        {label} 
                    </Link>
                )
            })}
        </nav>
    )
};