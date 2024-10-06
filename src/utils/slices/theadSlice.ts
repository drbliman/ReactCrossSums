import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface theadState {
  thead: boolean[];
}

const initialState: theadState = {
  thead: [],
};

const theadStateSlice = createSlice({
  name: "theadState",
  initialState,
  reducers: {
    setThead(state, action: PayloadAction<boolean[]>) {
      state.thead = action.payload;
    },
  },
});

export const { setThead } = theadStateSlice.actions;
export default theadStateSlice.reducer;
