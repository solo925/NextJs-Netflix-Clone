import connectToDB from "@/database";
import Favorites from "@/models/Favorite";
import { Favorite } from "@/types";
import { NextResponse } from "next/server";


interface SearchParams {
  id: string | null;
  accountID: string | null;
}

export const dynamic = "force-dynamic";


export async function GET(req: Request): Promise<NextResponse> {
  try {
    
    await connectToDB();

    
    const { searchParams }: { searchParams: URLSearchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const accountID = searchParams.get("accountID");

    if (!id || !accountID) {
      return NextResponse.json({
        success: false,
        message: "Both id and accountID are required",
      });
    }

    
    const getAllFavorites:Favorite[] = await Favorites.find({ uid: id, accountID });

    if (getAllFavorites) {
      return NextResponse.json({
        success: true,
        data: getAllFavorites,
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
