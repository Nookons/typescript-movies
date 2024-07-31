import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IMoviesResponse } from "../../types/Movie";

// Type for the state
type ItemsState = {
    user: any,
    loading: boolean;
    error: string | undefined;
}

const initialState: ItemsState = {
    user: {},
    loading: false,
    error: undefined
};

export const fetchUser = createAsyncThunk<IMoviesResponse, number, { rejectValue: string }>(
    'movies/fetchMovies',
    async (page, { rejectWithValue }) => {
        try {
            const response = await fetch(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc`, {
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
            return data as IMoviesResponse;
        } catch (error) {
            return rejectWithValue('There was an error loading data from the server. Please try again.');
        }
    }
);

const userSLice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        // Add synchronous actions if needed
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUser.pending, (state) => {
                state.loading = true;
                state.error = undefined;
            })
            .addCase(fetchUser.fulfilled, (state, action) => {
                state.user = action.payload;
                state.loading = false;
            })
            .addCase(fetchUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Failed to fetch movies';
            });
    }
});

export default userSLice.reducer;
