import prismadb from "@/lib/prismadb";

import { SizeForm } from "./components/size-form";
import { generate12ByteId } from "@/lib/utils";

const SizePage = async ({
    params
}: { 
    params: { sizeId: string }
}) => {

    // check size ID
    const checkParamIdForSize = (params: any) => {
        if (params?.sizeId === "new") {
            const id = generate12ByteId(12);
            return id;
        } else {
            return params?.sizeId;
        }
    }

    const size = await prismadb.size.findUnique({
        where: {
            id: checkParamIdForSize(params)
        }
    });

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <SizeForm initialData={size} />
            </div>
        </div>
    )
}

export default SizePage; 