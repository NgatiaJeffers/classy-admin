// Targetting Individual Store, PATCH and DELETE Stores
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

import prismadb from "@/lib/prismadb";

// Router for GET method
export async function GET(
    _req: Request,
    { params }: { params: { colorId: string } }
) {
    try {

        // Check if the storeId Exsists
        if (!params?.colorId) {
            return new NextResponse("Color ID is required", { status: 400 });
        }

        // Update store
        const color = await prismadb.color.findUnique({
            where: {
                id: params?.colorId,
            }
        });

        return NextResponse.json(color)
    } catch (error) {
        console.log('[COLOR_GET]', error);
        return new NextResponse("Internal error", { status: 500 });
    }
}

// Router method for PATCH
export async function PATCH(
    req: Request,
    { params }: { params: { storeId: string, colorId: string } }
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

        // Check if the label exist in color
        if (!name) {
            return new NextResponse("Name is required", { status: 400 });
        }

        if (!value) {
            return new NextResponse("Value is required", { status: 400 });
        }

        // Check if the storeId Exsists
        if (!params?.colorId) {
            return new NextResponse("Color ID is required", { status: 400 });
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
        const color = await prismadb.color.updateMany({
            where: {
                id: params?.colorId,
            },
            data: {
                name,
                value
            }
        });

        return NextResponse.json(color)
    } catch (error) {
        console.log('COLOR_PATCH]', error);
        return new NextResponse("Internal error", { status: 500 });
    }
}

// Router for DELETE method
export async function DELETE(
    _req: Request,
    { params }: { params: { storeId: string, colorId: string } }
) {
    try {
        // Get user ID
        const { userId } = auth();

        // Check is user exists
        if (!userId) {
            return new NextResponse("Unauthenticated", { status: 403 });
        }

        // Check if the storeId Exsists
        if (!params?.colorId) {
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
        const color = await prismadb.color.deleteMany({
            where: {
                id: params?.colorId,
            }
        });

        return NextResponse.json(color)
    } catch (error) {
        console.log('[COLOR_DELETE]', error);
        return new NextResponse("Internal error", { status: 500 });
    }
}