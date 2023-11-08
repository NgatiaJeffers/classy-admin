// Targetting Individual Store, PATCH and DELETE Stores
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

import prismadb from "@/lib/prismadb";

// Router method for PATCH
export async function PATCH(
    req: Request,
    { params }: { params: { storeId: string } }
) {
    try {
        // Get user ID
        const { userId } = auth();
        const body = await req.json();

        // Desctructure to get name of the store
        const { name } = body;

        // Check is user exists
        if (!userId) {
            return new NextResponse("Unauthenticated", { status: 403 });
        }

        // Check if the name of the store exists
        if (!name) {
            return new NextResponse("Name is required", { status: 400 });
        }

        // Check if the storeId Exsists
        if (!params?.storeId) {
            return new NextResponse("Store ID is required", { status: 400 });
        }

        // Update store
        const store = await prismadb.store.updateMany({
            where: {
                id: params?.storeId,
                userId,
            },
            data: {
                name
            }
        });

        return NextResponse.json(store)
    } catch (error) {
        console.log('[STORE_PATCH]', error);
        return new NextResponse("Internal error", { status: 500 });
    }
}

// Router for DELETE method
export async function DELETE(
    _req: Request,
    { params }: { params: { storeId: string } }
) {
    try {
        // Get user ID
        const { userId } = auth();

        // Check is user exists
        if (!userId) {
            return new NextResponse("Unauthenticated", { status: 403 });
        }

        // Check if the storeId Exsists
        if (!params?.storeId) {
            return new NextResponse("Store ID is required", { status: 400 });
        }

        // Update store
        const store = await prismadb.store.deleteMany({
            where: {
                id: params?.storeId,
                userId,
            }
        });

        return NextResponse.json(store)
    } catch (error) {
        console.log('[STORE_DELETE]', error);
        return new NextResponse("Internal error", { status: 500 });
    }
}