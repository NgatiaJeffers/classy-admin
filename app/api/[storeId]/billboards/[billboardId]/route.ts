// Targetting Individual Store, PATCH and DELETE Stores
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

import prismadb from "@/lib/prismadb";

// Router for GET method
export async function GET(
    _req: Request,
    { params }: { params: { billboardId: string } }
) {
    try {

        // Check if the storeId Exsists
        if (!params.billboardId) {
            return new NextResponse("Billboard ID is required", { status: 400 });
        }

        // Update store
        const billboard = await prismadb.billboard.findUnique({
            where: {
                id: params.billboardId,
            }
        });

        return NextResponse.json(billboard)
    } catch (error) {
        console.log('[BILLBOARD_GET]', error);
        return new NextResponse("Internal error", { status: 500 });
    }
}

// Router method for PATCH
export async function PATCH(
    req: Request,
    { params }: { params: { storeId: string, billboardId: string } }
) {
    try {
        // Get user ID
        const { userId } = auth();
        const body = await req.json();

        // Desctructure to get name of the store
        const { label, imageUrl } = body;

        // Check is user exists
        if (!userId) {
            return new NextResponse("Unauthenticated", { status: 403 });
        }

        // Check if the label exist in billboard
        if (!label) {
            return new NextResponse("Label is required", { status: 400 });
        }

        if (!imageUrl) {
            return new NextResponse("Image URL is required", { status: 400 });
        }

        // Check if the storeId Exsists
        if (!params.billboardId) {
            return new NextResponse("Billboard ID is required", { status: 400 });
        }

        const storebyUserId = await prismadb.store.findFirst({
            where: {
                id: params.storeId,
                userId,
            }
        });

        if (!storebyUserId) {
            return new NextResponse("Unauthorized", { status: 403 });
        }

        // Update store
        const billboard = await prismadb.billboard.updateMany({
            where: {
                id: params.billboardId,
            },
            data: {
                label,
                imageUrl
            }
        });

        return NextResponse.json(billboard)
    } catch (error) {
        console.log('BILLBOARD_PATCH]', error);
        return new NextResponse("Internal error", { status: 500 });
    }
}

// Router for DELETE method
export async function DELETE(
    _req: Request,
    { params }: { params: { storeId: string, billboardId: string } }
) {
    try {
        // Get user ID
        const { userId } = auth();

        // Check is user exists
        if (!userId) {
            return new NextResponse("Unauthenticated", { status: 403 });
        }

        // Check if the storeId Exsists
        if (!params.billboardId) {
            return new NextResponse("Billboard ID is required", { status: 400 });
        }

        const storebyUserId = await prismadb.store.findFirst({
            where: {
                id: params.storeId,
                userId,
            }
        });

        if (!storebyUserId) {
            return new NextResponse("Unauthorized", { status: 403 });
        }

        // Update store
        const billboard = await prismadb.billboard.deleteMany({
            where: {
                id: params.billboardId,
            }
        });

        return NextResponse.json(billboard)
    } catch (error) {
        console.log('[BILLBOARD_DELETE]', error);
        return new NextResponse("Internal error", { status: 500 });
    }
}