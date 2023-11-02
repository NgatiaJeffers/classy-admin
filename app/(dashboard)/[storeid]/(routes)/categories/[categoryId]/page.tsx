import prismadb from "@/lib/prismadb";

import { CategoryForm } from "./components/category-form";
import { generate12ByteId } from "@/lib/utils";

const CategoryPage = async ({
    params
}: { 
    params: { categoryId: string, storeId: string }
}) => {

    // check billboard ID
    const checkParamIdForCategory = (params: any) => {
        if (params?.categoryId === "new") {
            const id = generate12ByteId(12);
            return id;
        } else {
            return params?.categoryId;
        }
    }

    const category = await prismadb.category.findUnique({
        where: {
            id: checkParamIdForCategory(params)
        }
    });

    const billboards = await prismadb.billboard.findMany({
        where: {
            storeId: params.storeId,
        }
    })

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <CategoryForm billboards={billboards} initialData={category} />
            </div>
        </div>
    )
}

export default CategoryPage; 