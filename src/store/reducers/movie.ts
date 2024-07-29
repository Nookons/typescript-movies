// src/store/moviesSlice.ts
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IMoviesResponse } from "../../types/Movie";

// Type for the state
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

// Asynchronous thunk for fetching movies
export const fetchMovies = createAsyncThunk<IMoviesResponse, number, { rejectValue: string }>(
    'movies/fetchMovies',
    async (page: number, { rejectWithValue }) => {
        try {
            const response = await fetch(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc`, {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: `Bearer ${process.env.REACT_APP_TMDB_API_KEY}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch');
            }
            const data = await response.json();
            console.log(data);
            return data as IMoviesResponse;
        } catch (error) {
            return rejectWithValue('There was an error loading data from the server. Please try again.');
        }
    }
);

const movieSlice = createSlice({
    name: 'movies',
    initialState,
    reducers: {
        // Add synchronous actions if needed
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
                state.error = action.payload || 'Failed to fetch movies';
            });
    }
});

export default movieSlice.reducer;
