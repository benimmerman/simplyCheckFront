import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: null,
};

const userSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    loginUser: (state, action) => {
      state.username = action.payload.username;
    },
    logoutUser: (state) => {
      state.username = null;
    },
  }
});

export const { loginUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;