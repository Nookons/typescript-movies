export interface IMovie {
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string; // Используйте string для даты
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}

export interface IMoviesResponse {
    page: number;
    results: IMovie[];
    total_pages: number;
    total_results: number;
}

export interface IResponseMovies {
    movies: IMoviesResponse;
    loading: boolean;
}

