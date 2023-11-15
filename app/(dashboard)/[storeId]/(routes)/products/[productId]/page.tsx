import prismadb from "@/lib/prismadb";

import { ProductForm } from "./components/product-form";
import { generate12ByteId } from "@/lib/utils";

const ProductPage = async ({
    params
}: { 
    params: { productId: string, storeId: string }
}) => {

    // check billboard ID
    const checkParamId = (params: any) => {
        if (params?.productId === "new") {
            const id = generate12ByteId(12);
            return id;
        } else {
            return params?.productId;
        }
    }

    const product = await prismadb.product.findUnique({
        where: {
            id: checkParamId(params)
        },
        include: {
            images: true,
        }
    });

    const categories = await prismadb.category.findMany({
        where: {
            storeId: params?.storeId,
        }
    });

    const sizes = await prismadb.size.findMany({
        where: {
            storeId: params?.storeId,
        }
    });

    const colors = await prismadb.color.findMany({
        where: {
            storeId: params?.storeId,
        }
    });

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <ProductForm 
                    initialData={product}
                    colors={colors}
                    sizes={sizes}
                    categories={categories}
                />
            </div>
        </div>
    )
}

export default ProductPage; 