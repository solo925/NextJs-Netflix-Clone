import connectToDB from "@/database";
import Favorites from "@/models/Favorite";

import { NextResponse } from "next/server";


interface FavoriteRequestData {
  uid: string;
  movieID: string;
  accountID: string;
}

export const dynamic = "force-dynamic";


export async function POST(req: Request): Promise<NextResponse> {
  try {
    
    await connectToDB();

    
    const data: FavoriteRequestData = await req.json();

    
    const isFavoriteAlreadyExists = await Favorites.find({
      uid: data.uid,
      movieID: data.movieID,
      accountID: data.accountID,
    });

    if (isFavoriteAlreadyExists && isFavoriteAlreadyExists.length > 0) {
      return NextResponse.json({
        success: false,
        message: "This is already added to your list",
      });
    }

    
    const newlyAddedFavorite = await Favorites.create(data);

    if (newlyAddedFavorite) {
      return NextResponse.json({
        success: true,
        message: "Added to your list successfully",
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
