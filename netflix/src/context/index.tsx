"use client";

import CircleLoader from "@/componets/circle-loader";
import { useSession } from "next-auth/react";
import { createContext, ReactNode, useEffect, useState } from "react";

interface GlobalContextType {
  loggedInAccount: any;
  setLoggedInAccount: (value: any) => void;
  accounts: any[];
  setAccounts: (accounts: any[]) => void;
  pageLoader: boolean;
  setPageLoader: (value: boolean) => void;
  mediaData: any[];
  setMediaData: (data: any[]) => void;
  searchResults: any[];
  setSearchResults: (results: any[]) => void;
  currentMediaInfoIdAndType: any | null;
  setCurrentMediaInfoIdAndType: (value: any | null) => void;
  showDetailsPopup: boolean;
  setShowDetailsPopup: (value: boolean) => void;
  mediaDetails: any | null;
  setMediaDetails: (details: any | null) => void;
  similarMedias: any[];
  setSimilarMedias: (medias: any[]) => void;
  favorites: any[];
  setFavorites: (favorites: any[]) => void;
}

export const GlobalContext = createContext<GlobalContextType | null>(null);

interface GlobalStateProps {
  children: ReactNode;
}

export default function GlobalState({ children }: GlobalStateProps) {
  const [loggedInAccount, setLoggedInAccount] = useState<any>(null);
  const [accounts, setAccounts] = useState<any[]>([]);
  const [pageLoader, setPageLoader] = useState<boolean>(true);
  const [mediaData, setMediaData] = useState<any[]>([]);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [currentMediaInfoIdAndType, setCurrentMediaInfoIdAndType] = useState<any | null>(null);
  const [showDetailsPopup, setShowDetailsPopup] = useState<boolean>(false);
  const [mediaDetails, setMediaDetails] = useState<any | null>(null);
  const [similarMedias, setSimilarMedias] = useState<any[]>([]);
  const [favorites, setFavorites] = useState<any[]>([]);

  const { data: session } = useSession();

  useEffect(() => {
    const storedAccount = sessionStorage.getItem("loggedInAccount");
    if (storedAccount) {
      setLoggedInAccount(JSON.parse(storedAccount));
    }
  }, []);

  if (session === undefined) return <CircleLoader />;

  return (
    <GlobalContext.Provider
      value={{
        loggedInAccount,
        setLoggedInAccount,
        accounts,
        setAccounts,
        pageLoader,
        setPageLoader,
        mediaData,
        setMediaData,
        searchResults,
        setSearchResults,
        currentMediaInfoIdAndType,
        setCurrentMediaInfoIdAndType,
        showDetailsPopup,
        setShowDetailsPopup,
        mediaDetails,
        setMediaDetails,
        similarMedias,
        setSimilarMedias,
        favorites,
        setFavorites,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
