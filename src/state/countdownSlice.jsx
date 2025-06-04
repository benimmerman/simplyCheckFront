import { createSlice } from "@reduxjs/toolkit";

const FIFTEEN_MINUTES = 15 * 60; // 15 minutes in seconds

const initialState = {
  timeLeft: FIFTEEN_MINUTES,
};

const countdownSlice = createSlice({
  name: "countdown",
  initialState,
  reducers: {
    resetCountdown: (state) => {
      state.timeLeft = FIFTEEN_MINUTES;
    },
    decrementTime: (state) => {
      state.timeLeft -= 1;
    },
  },
});

export const { resetCountdown, decrementTime } = countdownSlice.actions;

export default countdownSlice.reducer;
