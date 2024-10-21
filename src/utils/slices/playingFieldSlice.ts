import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface playingFieldState {
  playingField: boolean;
  playingFieldFirst: boolean;
}

const initialState: playingFieldState = {
  playingField: false,
  playingFieldFirst: true,
};

const playingFieldStateSlice = createSlice({
  name: "playingFieldState",
  initialState,
  reducers: {
    setPlayingField(state, action: PayloadAction<boolean>) {
      state.playingField = action.payload;
    },
    setPlayingFieldFirst(state, action: PayloadAction<boolean>) {
      state.playingFieldFirst = action.payload;
    },
  },
});

export const { setPlayingField, setPlayingFieldFirst } =
  playingFieldStateSlice.actions;
export default playingFieldStateSlice.reducer;
