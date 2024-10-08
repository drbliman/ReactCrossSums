import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface innerWidthState {
  innerWidth: number[];
  limitationNumders: number;
  negativeNumbers: boolean;
}

const initialState: innerWidthState = {
  innerWidth: [],
  limitationNumders: 0,
  negativeNumbers: false,
};

const innerWidthStateSlice = createSlice({
  name: "innerWidthState",
  initialState,
  reducers: {
    setInnerWidth(state, action: PayloadAction<number[]>) {
      state.innerWidth = action.payload;
    },
    setlimitatiomNumders(state, action: PayloadAction<number>) {
      state.limitationNumders = action.payload;
    },
    setNegativeNumbers(state, action: PayloadAction<boolean>) {
      state.negativeNumbers = action.payload;
    },
  },
});

export const { setInnerWidth, setlimitatiomNumders, setNegativeNumbers } =
  innerWidthStateSlice.actions;
export default innerWidthStateSlice.reducer;
