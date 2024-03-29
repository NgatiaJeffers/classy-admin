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
            href: `/${params?.storeId}`,
            label: 'Overview',
            active: pathname === `/${params?.storeId}`
        },
        {
            href: `/${params?.storeId}/billboards`,
            label: 'Billboards',
            active: pathname === `/${params?.storeId}/billboards`
        },
        {
            href: `/${params?.storeId}/categories`,
            label: 'Categories',
            active: pathname === `/${params?.storeId}/categories`
        },
        {
            href: `/${params?.storeId}/colors`,
            label: 'Colors',
            active: pathname === `/${params?.storeId}/colors`
        },
        {
            href: `/${params?.storeId}/products`,
            label: 'Products',
            active: pathname === `/${params?.storeId}/products`
        },
        {
            href: `/${params?.storeId}/orders`,
            label: 'Orders',
            active: pathname === `/${params?.storeId}/orders`
        },
        {
            href: `/${params?.storeId}/sizes`,
            label: 'Sizes',
            active: pathname === `/${params?.storeId}/sizes`
        },
        {
            href: `/${params?.storeId}/settings`,
            label: 'Settings',
            active: pathname === `/${params?.storeId}/settings`
        }
    ];


    return (
        <nav
            className={cn("flex items-center space-x-4 lg:space-x-6", className)}
            {...props}
        >
            {routes?.map((route) => {
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