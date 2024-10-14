import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface musicState {
  music: boolean;
}

const initialState: musicState = {
  music: true,
};

const musicSlice = createSlice({
  name: "music",
  initialState,
  reducers: {
    setMusic(state, action: PayloadAction<boolean>) {
      state.music = action.payload;
    },
  },
});

export const { setMusic } = musicSlice.actions;
export default musicSlice.reducer;
