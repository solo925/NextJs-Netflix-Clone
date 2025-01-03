import connectToDB from "@/database";
import Account from "@/models/Account";
import { compare } from "bcryptjs";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

interface AccountValidationRequest {
    pin: string;
    accountId: string;
    uid: string;
}

export async function POST(req: Request): Promise<Response> {
    try {
        await connectToDB();

        const { pin, accountId, uid }: AccountValidationRequest = await req.json();

        const getCurrentAccount = await Account.findOne({ _id: accountId, uid });

        if (!getCurrentAccount) {
            return NextResponse.json({
                success: false,
                message: "Account not found",
            });
        }

        const checkPin = await compare(pin, getCurrentAccount.pin);

        if (checkPin) {
            return NextResponse.json({
                success: true,
                message: "Welcome to Netflix!",
            });
        } else {
            return NextResponse.json({
                success: false,
                message: "Incorrect PIN! Please try again",
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
