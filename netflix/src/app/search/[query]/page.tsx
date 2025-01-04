"use client";

import CircleLoader from "@/componets/circle-loader";
import ManageAccounts from "@/componets/manage-accounts";
import MediaItem from "@/componets/media-item/page";
import Navbar from "@/componets/navbar";
import UnauthPage from "@/componets/unauth-page";
import { GlobalContext } from "@/context";
import { Favorite, MediaItemType } from "@/types";
import { getAllfavorites, getTVorMovieSearchResults } from "@/utils";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { useContext, useEffect } from "react";

export default function Search() {
  const {
    loggedInAccount,
    searchResults,
    pageLoader,
    setPageLoader,
    setSearchResults,
  } = useContext(GlobalContext)!;

  const { data: session } = useSession();
  const params=useParams();
    const query = String(params.query || ''); 
    
  useEffect(() => {
      async function getSearchResults() {
        
       
          
        const tvShows = await getTVorMovieSearchResults("tv", query);
        const movies = await getTVorMovieSearchResults("movie", query);
        const allFavorites = await getAllfavorites(
        session?.user?.uid!,
        loggedInAccount?._id
      );

      setSearchResults([
        ...tvShows!
          .filter(
            (item) => item.backdrop_path !== null && item.poster_path !== null
          )
          .map((tvShowItem) => ({
            ...tvShowItem,
            type: "tv",
            addedToFavorites:
              allFavorites && allFavorites.length
                ? allFavorites
                    .map((fav:Favorite) => fav.movieID)
                    .indexOf(tvShowItem.id) > -1
                : false,
          })),
        ...movies!
          .filter(
            (item) => item.backdrop_path !== null && item.poster_path !== null
          )
          .map((movieItem) => ({
            ...movieItem,
            type: "movie",
            addedToFavorites:
              allFavorites && allFavorites.length
                ? allFavorites.map((fav:Favorite) => fav.movieID).indexOf(movieItem.id) >
                  -1
                : false,
          })),
      ]);
      setPageLoader(false);
      console.log(tvShows, movies);
    }

    getSearchResults();
  }, [loggedInAccount, session?.user?.uid, params.query, setSearchResults, setPageLoader]);

  if (session === null) return <UnauthPage />;
  if (loggedInAccount === null) return <ManageAccounts />;
  if (pageLoader) return <CircleLoader />;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      <Navbar />
      <div className="mt-[100px] space-y-0.5 md:space-y-2 px-4">
        <h2 className="cursor-pointer text-sm font-semibold text-[#e5e5e5] transition-colors duration-200 hover:text-white md:text-2xl">
          Showing Results for {decodeURI(query)}
        </h2>
        <div className="grid grid-cols-5 gap-3 items-center scrollbar-hide md:p-2">
          {searchResults && searchResults.length
            ? searchResults.map((searchItem: MediaItemType) => (
                <MediaItem
                  key={searchItem.id}
                  media={searchItem}
                  searchView={true}
                />
              ))
            : null}
        </div>
      </div>
    </motion.div>
  );
}
