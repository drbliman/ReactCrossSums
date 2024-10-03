import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FieldState {
  size: number;
}

const initialState: FieldState = {
  size: 5,
};

const fieldSlice = createSlice({
  name: "field",
  initialState,
  reducers: {
    setField(state, action: PayloadAction<number>) {
      state.size = action.payload;
    },
  },
});

export const { setField } = fieldSlice.actions;
export default fieldSlice.reducer;
