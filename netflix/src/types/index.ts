export interface Media {
    id: string;
    backdrop_path: string | null;
    poster_path: string | null;
    title?: string;
    name?: string;
    original_name?: string;
    [key: string]: any;
}
