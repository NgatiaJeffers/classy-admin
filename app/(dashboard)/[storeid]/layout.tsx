import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import prismadb from "@/lib/prismadb";
import Navbar from "@/components/navbar";

export default async function DashboardLayout({ children, params }: {
    children: React.ReactNode;
    params: { storeId: string }
}) {
    const { userId } = auth();

    if (!userId) {
        redirect("/sign-in");
    }

    // call the store to get the user id
    const store = await prismadb.store.findFirst({
        where: {
            id: params?.storeId,
            userId
        }
    });

    // Check if user is in the store
    if (!store) {
        redirect("/")
    }

    return (
        <>
            <Navbar />
            {children}
        </>
    )
}