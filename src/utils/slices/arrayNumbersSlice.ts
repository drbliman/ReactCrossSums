import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface arrayNumbersState {
  arrayNumbers: number[][];
  arrayBoolean: boolean[][];
  arrayAnswers: [number[], number[]];
}

const initialState: arrayNumbersState = {
  arrayNumbers: [],
  arrayBoolean: [],
  arrayAnswers: [[], []],
};

const arrayStateSlice = createSlice({
  name: "arrayNumbersState",
  initialState,
  reducers: {
    setArrayNumbers(state, action: PayloadAction<number[][]>) {
      state.arrayNumbers = action.payload;
    },
    setArrayBoolean(state, action: PayloadAction<boolean[][]>) {
      state.arrayBoolean = action.payload;
    },
    setArrayAnswers(state, action: PayloadAction<[number[], number[]]>) {
      state.arrayAnswers = action.payload;
    },
  },
});

export const { setArrayNumbers, setArrayBoolean, setArrayAnswers } =
  arrayStateSlice.actions;
export default arrayStateSlice.reducer;
