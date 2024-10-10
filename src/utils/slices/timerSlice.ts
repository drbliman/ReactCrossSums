import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface timerState {
  timer: number;
}

const initialState: timerState = {
  timer: 0,
};

const timerStateSlice = createSlice({
  name: "timer",
  initialState,
  reducers: {
    setTimer(state, action: PayloadAction<number>) {
      state.timer = action.payload;
    },
  },
});

export const { setTimer } = timerStateSlice.actions;
export default timerStateSlice.reducer;
