export interface Media {
    id: string;
    backdrop_path: string | null;
    poster_path: string | null;
    title?: string;
    name?: string;
    original_name?: string;
    [key: string]: any;
}

export interface Favorite {
    id: string;
    movieID: string;
    title: string;
    type: string;
    addedToFavorites: boolean;
    [key: string]: any;
}

export interface MediaItemType {
    id: string;
    backdrop_path: string | null;
    poster_path: string | null;
    type: "tv" | "movie";
    addedToFavorites: boolean;
}

export interface MediaDataType {
    title: string;
    medias: MediaItemType[];
}

export interface VideoData {
    type: string;
    key: string;
}

export interface MediaDetails {
    results?: VideoData[];
}

export interface BannerProps {
    medias: Media[];
}

export interface MediaRowData {
    title: string;
    medias: Media[];
}

export interface CommonLayoutProps {
    mediaData: MediaRowData[];
}

export interface DetailsPopupProps {
    show: boolean;
    setShow: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface MediaDetails {
    release_date?: string;
    videos?: {
        results: { type: string; key: string }[];
    };

}

export interface SimilarMedia {
    id: string;
    backdrop_path: string | null;
    poster_path: string | null;

}

export interface MediaRowProps {
    title: string;
    medias: Media[];
}

export interface Account {
    _id: string;
    name: string;
}

export interface AccountPopupProps {
    accounts: Account[];
    setLoggedInAccount: (account: Account | null) => void;
    signOut: () => void;
    loggedInAccount: Account | null;
    setPageLoader: (loaderState: boolean) => void;
}

export interface MenuItem {
    id: string;
    title: string;
    path: string;
}

export interface Question {
    ques: string;
    ans: string;
}

export interface GlobalContextType {
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