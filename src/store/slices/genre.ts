import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface InitState {
  favorite: boolean;
}

const initialState: InitState = {
  favorite: false,
};

const genreSlice = createSlice({
  name: 'genre_state',
  initialState,
  reducers: {
    setGenre: (state, action: PayloadAction<boolean>) => {
      state.favorite = action.payload;
    },
    setGenreReset: () => initialState,
  },
});

export const {setGenre, setGenreReset} = genreSlice.actions;
export default genreSlice.reducer;
