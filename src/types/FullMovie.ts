// Тип для представления информации о жанре
interface Genre {
    id: number;
    name: string;
}

// Тип для представления информации о компании по производству
export interface ProductionCompany {
    id: number;
    logo_path: string | null;
    name: string;
    origin_country: string;
}

// Тип для представления информации о стране производства
export interface ProductionCountry {
    iso_3166_1: string;
    name: string;
}

// Тип для представления информации о языке
export interface ISpokenLanguage {
    english_name: string;
    iso_639_1: string;
    name: string;
}

// Интерфейс для представления коллекции фильмов
export interface BelongsToCollection {
    id: number;
    name: string;
    poster_path: string | null;
    backdrop_path: string | null;
}


export interface IMovieFull {
    adult: boolean;
    backdrop_path: string | null;
    belongs_to_collection: BelongsToCollection | null;
    budget: number;
    genres: Genre[];
    homepage: string;
    id: number;
    imdb_id: string;
    origin_country: string[];
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string | null;
    production_companies: ProductionCompany[];
    production_countries: ProductionCountry[];
    release_date: string;
    revenue: number;
    runtime: number;
    spoken_languages: ISpokenLanguage[];
    status: string;
    tagline: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}