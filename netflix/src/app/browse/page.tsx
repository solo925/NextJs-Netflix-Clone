"use client";

import CircleLoader from "@/componets/circle-loader";
import CommonLayout from "@/componets/common-layout/page";
import ManageAccounts from "@/componets/manage-accounts";
import UnauthPage from "@/componets/unauth-page";
import { GlobalContext } from "@/context";
import { Favorite, Media } from "@/types";
import {
    getAllfavorites,
    getPopularMedias,
    getTopratedMedias,
    getTrendingMedias,
} from "@/utils";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import { useContext, useEffect } from "react";


interface BrowseProps {}

const Browse: React.FC<BrowseProps> = () => {
  const {
    loggedInAccount,
    mediaData,
    setMediaData,
    setPageLoader,
    pageLoader,
  } = useContext(GlobalContext)! ?? {};

  const { data: session } = useSession<Session | any>(); 

  useEffect(() => {
    async function getAllMedias() {
      const trendingTvShows = await getTrendingMedias("tv");
      const popularTvShows = await getPopularMedias("tv");
      const topratedTvShows = await getTopratedMedias("tv");

      const trendingMovieShows = await getTrendingMedias("movie");
      const popularMovieShows = await getPopularMedias("movie");
      const topratedMovieShows = await getTopratedMedias("movie");

      const allFavorites:Favorite[] = await getAllfavorites(
        session?.user?.uid!,
        loggedInAccount?._id
      );

      const mediaDataWithFavorites = [
        {
          title: "Trending TV Shows",
          medias: trendingTvShows,
        },
        {
          title: "Popular TV Shows",
          medias: popularTvShows,
        },
        {
          title: "Top rated TV Shows",
          medias: topratedTvShows,
        },
        {
          title: "Trending Movies",
          medias: trendingMovieShows,
        },
        {
          title: "Popular Movies",
          medias: popularMovieShows,
        },
        {
          title: "Top rated Movies",
          medias: topratedMovieShows,
        },
      ].map((item: any) => ({
        ...item,
        medias: item.medias!.map((mediaItem: Media) => ({
          ...mediaItem,
          type: item.title.includes("TV Shows") ? "tv" : "movie",
          addedToFavorites:
            allFavorites && allFavorites.length
              ? allFavorites.some(
                  (fav: Favorite) =>String(fav.movieID)=== mediaItem.id 
                )
              : false,
        })),
      }));

      setMediaData(mediaDataWithFavorites);
      setPageLoader(false);
    }

    getAllMedias();
  }, [session, loggedInAccount, setMediaData, setPageLoader]);

  if (session === null) return <UnauthPage />;
  if (loggedInAccount === null) return <ManageAccounts />;
  if (pageLoader) return <CircleLoader />;

  return (
    <main className="flex min-h-screen flex-col">
      <CommonLayout mediaData={mediaData} />
    </main>
  );
};

export default Browse;
