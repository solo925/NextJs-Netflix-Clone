import connectToDB from "@/database";
import Account from "@/models/Account";
import { NextResponse } from "next/server";


interface SearchParams {
    id: string | null;
}

export const dynamic = "force-dynamic";


export async function GET(req: Request): Promise<NextResponse> {
    try {

        await connectToDB();


        const { searchParams }: { searchParams: URLSearchParams } = new URL(req.url);
        const id = searchParams.get("id");

        if (!id) {
            return NextResponse.json({
                success: false,
                message: "ID is required",
            });
        }


        const getAllAccounts = await Account.find({ uid: id });

        if (getAllAccounts) {
            return NextResponse.json({
                success: true,
                data: getAllAccounts,
            });
        } else {
            return NextResponse.json({
                success: false,
                message: "Something went wrong",
            });
        }
    } catch (e) {
        console.error(e);
        return NextResponse.json({
            success: false,
            message: "Something went wrong",
        });
    }
}
