// Targetting Individual Store, PATCH and DELETE Stores
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

import prismadb from "@/lib/prismadb";

// Router for GET method
export async function GET(
    _req: Request,
    { params }: { params: { categoryId: string } }
) {
    try {

        // Check if the storeId Exsists
        if (!params?.categoryId) {
            return new NextResponse("Category ID is required", { status: 400 });
        }

        // Update store
        const category = await prismadb.category.findUnique({
            where: {
                id: params?.categoryId,
            }
        });

        return NextResponse.json(category)
    } catch (error) {
        console.log('[CATEGORY_GET]', error);
        return new NextResponse("Internal error", { status: 500 });
    }
}

// Router method for PATCH
export async function PATCH(
    req: Request,
    { params }: { params: { storeId: string, categoryId: string } }
) {
    try {
        // Get user ID
        const { userId } = auth();
        const body = await req.json();

        // Desctructure to get name of the store
        const { name, billboardId } = body;

        // Check is user exists
        if (!userId) {
            return new NextResponse("Unauthenticated", { status: 403 });
        }

        // Check if the label exist in billboard
        if (!name) {
            return new NextResponse("Name is required", { status: 400 });
        }

        if (!billboardId) {
            return new NextResponse("Billboard ID is required", { status: 400 });
        }

        // Check if the storeId Exsists
        if (!params?.categoryId) {
            return new NextResponse("Billboard ID is required", { status: 400 });
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
        const category = await prismadb.category.updateMany({
            where: {
                id: params?.categoryId,
            },
            data: {
                name,
                billboardId
            }
        });

        return NextResponse.json(category)
    } catch (error) {
        console.log('CATEGORY_PATCH]', error);
        return new NextResponse("Internal error", { status: 500 });
    }
}

// Router for DELETE method
export async function DELETE(
    _req: Request,
    { params }: { params: { storeId: string, categoryId: string } }
) {
    try {
        // Get user ID
        const { userId } = auth();

        // Check is user exists
        if (!userId) {
            return new NextResponse("Unauthenticated", { status: 403 });
        }

        // Check if the storeId Exsists
        if (!params?.categoryId) {
            return new NextResponse("Category ID is required", { status: 400 });
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
        const category = await prismadb.category.deleteMany({
            where: {
                id: params?.categoryId,
            }
        });

        return NextResponse.json(category)
    } catch (error) {
        console.log('[CATEGORY_DELETE]', error);
        return new NextResponse("Internal error", { status: 500 });
    }
}