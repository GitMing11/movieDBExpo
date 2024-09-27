import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface InitState {
  id: string;
  post_title: string;
  post_content: string;
  post_url: string;
  user: {
    user_id: string;
    user_name: string;
  };
}

const initialState: InitState = {
  id: '',
  post_title: '',
  post_content: '',
  post_url: '',
  user: {
    user_id: '',
    user_name: '',
  },
};

const postSlice = createSlice({
  name: 'post_state',
  initialState,
  reducers: {
    setPost: (state, action: PayloadAction<InitState>) => {
      state.id = action.payload.id;
      state.post_title = action.payload.post_title;
      state.post_content = action.payload.post_content;
      state.post_url = action.payload.post_url;
      state.user = action.payload.user;
    },
    setSendPost: (
      state,
      action: PayloadAction<{
        id: string;
        post_title: string;
        post_url: string;
        user: {
          user_id: string;
          user_name: string;
        };
      }>,
    ) => {
      state.id = action.payload.id;
      state.post_title = action.payload.post_title;
      state.post_url = action.payload.post_url;
      state.user = action.payload.user;
    },
    setPostID: (state, action: PayloadAction<InitState>) => {
      state.id = action.payload.id;
      state.user = action.payload.user;
    },
    setPostReset: () => initialState,
  },
});

export const {setPost, setSendPost, setPostID, setPostReset} =
  postSlice.actions;
export default postSlice.reducer;
