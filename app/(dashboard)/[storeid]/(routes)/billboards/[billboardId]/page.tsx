import prismadb from "@/lib/prismadb";

import { BillboardForm } from "./components/billboard-form";
import { generate12ByteId } from "@/lib/utils";

const BillBoardPage = async ({
    params
}: { 
    params: { billboardId: string }
}) => {

    // check billboard ID
    const checkParamIdForBillboard = (params: any) => {
        if (params?.billboardId === "new") {
            const id = generate12ByteId(12);
            return id;
        }
        return params?.billboard;
    }

    const billboard = await prismadb.billboard.findUnique({
        where: {
            id: checkParamIdForBillboard(params)
        }
    });

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <BillboardForm initialData={billboard} />
            </div>
        </div>
    )
}

export default BillBoardPage; 