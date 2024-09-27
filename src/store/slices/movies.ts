import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface IMovies {
  Title: string;
  Year: string;
  imdbID: string;
  Type: 'movie' | 'series' | 'episode';
  Poster?: string;
}

interface InitState {
  movies: IMovies[];
}

const initialState: InitState = {
  movies: [],
};

const movieSlice = createSlice({
  name: 'movie_state',
  initialState,
  reducers: {
    setMovies: (state, action: PayloadAction<IMovies[]>) => {
      state.movies = action.payload;
    },
    setMoviesReset: () => initialState,
  },
});

export const {setMovies, setMoviesReset} = movieSlice.actions;
export default movieSlice.reducer;
