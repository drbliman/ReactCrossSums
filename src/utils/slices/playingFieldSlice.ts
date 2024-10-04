import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface playingFieldState {
  playingField: boolean;
}

const initialState: playingFieldState = {
  playingField: false,
};

const playingFieldStateSlice = createSlice({
  name: "playingFieldState",
  initialState,
  reducers: {
    setPlayingField(state, action: PayloadAction<boolean>) {
      state.playingField = action.payload;
    },
  },
});

export const { setPlayingField } = playingFieldStateSlice.actions;
export default playingFieldStateSlice.reducer;
