import {configureStore} from '@reduxjs/toolkit';
import auth from './slices/auth';
import movies from './slices/movies';
import genre from './slices/genre';
import post from './slices/post';

const reducer = {
  auth_state: auth,
  movie_state: movies,
  genre_state: genre,
  post_state: post,
};

const store = configureStore({
  reducer: reducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
