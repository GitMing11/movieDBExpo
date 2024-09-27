import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface InitState {
  userid: string;
  password: string;
}

const initialState: InitState = {
  userid: '',
  password: '',
};

const authSlice = createSlice({
  name: 'auth_state',
  initialState,
  reducers: {
    setUserId: (state, action: PayloadAction<string>) => {
      state.userid = action.payload;
    },
    setUserPw: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    },
    setUserReset: () => initialState,
  },
});

export const {setUserId, setUserPw, setUserReset} = authSlice.actions;
export default authSlice.reducer;
