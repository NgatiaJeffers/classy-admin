// Targetting Individual Store, PATCH and DELETE Stores
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

import prismadb from "@/lib/prismadb";

// Router for GET method
export async function GET(
    _req: Request,
    { params }: { params: { sizeId: string } }
) {
    try {

        // Check if the storeId Exsists
        if (!params?.sizeId) {
            return new NextResponse("Size ID is required", { status: 400 });
        }

        // Update store
        const size = await prismadb.size.findUnique({
            where: {
                id: params?.sizeId,
            }
        });

        return NextResponse.json(size)
    } catch (error) {
        console.log('[SIZE_GET]', error);
        return new NextResponse("Internal error", { status: 500 });
    }
}

// Router method for PATCH
export async function PATCH(
    req: Request,
    { params }: { params: { storeId: string, sizeId: string } }
) {
    try {
        // Get user ID
        const { userId } = auth();
        const body = await req.json();

        // Desctructure to get name of the store
        const { name, value } = body;

        // Check is user exists
        if (!userId) {
            return new NextResponse("Unauthenticated", { status: 403 });
        }

        // Check if the label exist in size
        if (!name) {
            return new NextResponse("Name is required", { status: 400 });
        }

        if (!value) {
            return new NextResponse("IValue is required", { status: 400 });
        }

        // Check if the storeId Exsists
        if (!params?.sizeId) {
            return new NextResponse("Size ID is required", { status: 400 });
        }

        const storebyUserId = await prismadb.store.findFirst({
            where: {
                id: params?.storeId,
                userId,
            }
        });

        if (!storebyUserId) {
            return new NextResponse("Unauthorized", { status: 403 });
        }

        // Update store
        const size = await prismadb.size.updateMany({
            where: {
                id: params?.sizeId,
            },
            data: {
                name,
                value
            }
        });

        return NextResponse.json(size)
    } catch (error) {
        console.log('SIZE_PATCH]', error);
        return new NextResponse("Internal error", { status: 500 });
    }
}

// Router for DELETE method
export async function DELETE(
    _req: Request,
    { params }: { params: { storeId: string, sizeId: string } }
) {
    try {
        // Get user ID
        const { userId } = auth();

        // Check is user exists
        if (!userId) {
            return new NextResponse("Unauthenticated", { status: 403 });
        }

        // Check if the storeId Exsists
        if (!params?.sizeId) {
            return new NextResponse("Size ID is required", { status: 400 });
        }

        const storebyUserId = await prismadb.store.findFirst({
            where: {
                id: params?.storeId,
                userId,
            }
        });

        if (!storebyUserId) {
            return new NextResponse("Unauthorized", { status: 403 });
        }

        // Update store
        const size = await prismadb.size.deleteMany({
            where: {
                id: params?.sizeId,
            }
        });

        return NextResponse.json(size)
    } catch (error) {
        console.log('[SIZE_DELETE]', error);
        return new NextResponse("Internal error", { status: 500 });
    }
}