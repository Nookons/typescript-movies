import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IMoviesResponse } from "../../types/Movie";

type ItemsState = {
    movies: IMoviesResponse;
    loading: boolean;
    error: string | undefined;
}

const initialState: ItemsState = {
    movies: {
        page: 0,
        results: [],
        total_pages: 0,
        total_results: 0
    },
    loading: false,
    error: undefined
};

export const fetchMovies = createAsyncThunk<
    IMoviesResponse,  // Тип возвращаемого значения
    { page: number, searchType: string },  // Тип аргументов функции
    { rejectValue: string }  // Тип значения ошибки
>(
    'movies/fetchMovies',
    async ({ page, searchType }, { rejectWithValue }) => {
        try {
            const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

            /*if (!API_KEY) {
                throw new Error("API key is missing");
            }*/

            const options = {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNGM1MDM5NDk4N2I2ZTM1NzdlYzY3ZTIyNDBmZWQ3OSIsIm5iZiI6MTcyMjM1MDcwNy4yNDk2MjEsInN1YiI6IjY0ZDU3OTM3ZDEwMGI2MDBhZGEwMDI2ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.A3m5FiqgeKipzj7z01tJlvApmYckxXKcaoBiUzqVbyk`  // Используйте ключ из переменных окружения
                }
            };

            const response = await fetch(`https://api.themoviedb.org/3/movie/${searchType}?language=en-US&page=${page}`, options);

            if (!response.ok) {
                throw new Error('Failed to fetch');
            }

            const data = await response.json();
            return data as IMoviesResponse;
        } catch (error: any) {
            return rejectWithValue(`There was an error loading data from the server. Please try again. Error: ${error.message}`);
        }
    }
);

const movieSlice = createSlice({
    name: 'movies',
    initialState,
    reducers: {
        // Добавьте синхронные действия, если это необходимо
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchMovies.pending, (state) => {
                state.loading = true;
                state.error = undefined;
            })
            .addCase(fetchMovies.fulfilled, (state, action) => {
                state.movies = action.payload;
                state.loading = false;
            })
            .addCase(fetchMovies.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;  // Приведение типа для ошибки
            });
    }
});

export default movieSlice.reducer;
