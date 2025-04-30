import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: null,
  userId: null,
  csrfToken: null,
};

const userSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    loginUser: (state, action) => {
      state.username = action.payload.username;
      state.userId = action.payload.userId;
      state.csrfToken = action.payload.csrfToken;
      console.log(["state.username: ", state.username]);
      console.log(["state.userId: ", state.userId]);
      console.log(["state.csrfToken: ", state.csrfToken]);
    },
    logoutUser: (state) => {
      state.username = null;
      state.userId = null;
      state.csrfToken = null;
    },
  }
});

export const { loginUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;