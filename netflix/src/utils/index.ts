const API_KEY = process.env.API_KEY
const BASE_URL = process.env.BASE_URL

type MediaType = 'movie' | 'tv';

interface Media {
    id: number;
    title?: string;
    name?: string;
    backdrop_path?: string;
    poster_path?: string;
    type: MediaType;
    [key: string]: any;
}

interface ApiResponse<T> {
    results: T[];
    [key: string]: any;
}

export const getTrendingMedias = async (type: MediaType): Promise<Media[] | undefined> => {
    try {
        const res = await fetch(
            `${BASE_URL}/trending/${type}/day?api_key=${API_KEY}&language=en-US`,
            {
                method: "GET",
            }
        );

        const data: ApiResponse<Media> = await res.json();
        return data?.results;
    } catch (e) {
        console.error("Error fetching trending media:", e);
        throw e;
    }
};

export const getTopratedMedias = async (type: MediaType): Promise<Media[] | undefined> => {
    try {
        const res = await fetch(
            `${BASE_URL}/${type}/top_rated?api_key=${API_KEY}&language=en-US`,
            {
                method: "GET",
            }
        );

        const data: ApiResponse<Media> = await res.json();
        return data?.results;
    } catch (e) {
        console.error("Error fetching top-rated media:", e);
        throw e;
    }
};

export const getPopularMedias = async (type: MediaType): Promise<Media[] | undefined> => {
    try {
        const res = await fetch(
            `${BASE_URL}/${type}/popular?api_key=${API_KEY}&language=en-US`,
            {
                method: "GET",
            }
        );

        const data: ApiResponse<Media> = await res.json();
        return data?.results;
    } catch (e) {
        console.error("Error fetching popular media:", e);
        throw e;
    }
};

export const getTVorMoviesByGenre = async (type: MediaType, id: number): Promise<Media[] | undefined> => {
    try {
        const res = await fetch(
            `${BASE_URL}/discover/${type}?api_key=${API_KEY}&language=en-US&include_adult=false&sort_by=popularity.desc&with_genres=${id}`,
            {
                method: "GET",
            }
        );

        const data: ApiResponse<Media> = await res.json();
        return data?.results;
    } catch (e) {
        console.error("Error fetching movies/TV shows by genre:", e);
        throw e;
    }
};

export const getTVorMovieVideosByID = async (type: MediaType, id: number) => {
    try {
        const res = await fetch(
            `${BASE_URL}/${type}/${id}/videos?api_key=${API_KEY}&language=en-US&append_to_response=videos`,
            {
                method: "GET",
            }
        );

        const data = await res.json();
        return data;
    } catch (e) {
        console.error("Error fetching videos by media ID:", e);
        throw e;
    }
};

export const getTVorMovieSearchResults = async (type: MediaType, query: string): Promise<Media[] | undefined> => {
    try {
        const res = await fetch(
            `${BASE_URL}/search/${type}?api_key=${API_KEY}&include_adult=false&language=en-US&query=${query}`,
            {
                method: "GET",
            }
        );

        const data: ApiResponse<Media> = await res.json();
        return data?.results;
    } catch (e) {
        console.error("Error fetching search results:", e);
        throw e;
    }
};

export const getTVorMovieDetailsByID = async (type: MediaType, id: number) => {
    try {
        const res = await fetch(
            `${BASE_URL}/${type}/${id}?api_key=${API_KEY}&language=en-US&append_to_response=videos`,
            {
                method: "GET",
            }
        );

        const data = await res.json();
        return data;
    } catch (e) {
        console.error("Error fetching media details by ID:", e);
        throw e;
    }
};

export const getSimilarTVorMovies = async (type: MediaType, id: number): Promise<Media[] | undefined> => {
    try {
        const res = await fetch(
            `${BASE_URL}/${type}/${id}/similar?api_key=${API_KEY}&language=en-US`,
            {
                method: "GET",
            }
        );

        const data: ApiResponse<Media> = await res.json();
        return data?.results;
    } catch (e) {
        console.error("Error fetching similar media:", e);
        throw e;
    }
};

export const getAllfavorites = async (uid: string, accountID: string) => {
    try {
        const res = await fetch(
            `/api/favorites/get-all-favorites?id=${uid}&accountID=${accountID}`,
            {
                method: "GET",
            }
        );

        const data = await res.json();
        return data?.data;
    } catch (e) {
        console.error("Error fetching all favorites:", e);
        throw e;
    }
};
