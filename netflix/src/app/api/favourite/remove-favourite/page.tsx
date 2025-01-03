import connectToDB from "@/database";
import Favorites from "@/models/Favorite";
import { NextResponse } from "next/server";


interface SearchParams {
  id: string | null;
}

export const dynamic = "force-dynamic";


export async function DELETE(req: Request): Promise<NextResponse> {
  try {
    
    await connectToDB();

    
    const { searchParams }: { searchParams: URLSearchParams } = new URL(req.url);
    const id = searchParams.get("id");

    
    if (!id) {
      return NextResponse.json({
        success: false,
        message: "Favorite item ID is required",
      });
    }

    
    const deletedFavoriteItem = await Favorites.findByIdAndDelete(id);

    if (deletedFavoriteItem) {
      return NextResponse.json({
        success: true,
        message: "Removed from your list",
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
